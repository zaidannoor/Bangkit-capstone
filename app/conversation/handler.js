const { User, Role, Message, Conversation } = require("../../models");

module.exports = {
  handlerCreateConversation: async (req,res,next) => {
    try {
      const newConversation = await Conversation.create({
        topic: "new topic",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(200).json({
        status: "success",
        message: "Successfully create conversation",
        data: newConversation,
      });
    } catch (error) {
      next(error);
    }
  },

  handlerGetConversation: async (req, res, next) => {
    try {
      const conversations = await Conversation.findAll({
        attributes: { exclude: ["createdAt"] },
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get all Conversation",
        data: conversations,
      });
    } catch (error) {
      next(error);
    }
  },

  handlerGetChat: async (req,res,next) => {
    try {
      const { id_conversation } = req.body;
      const messages = await Message.findAll({
        where: {
          id_conversation,
        },
        include: [
          {
            model: User,
            as: "Penerima",
            attributes: ["id", "userName"],
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt", "penerima"] },
      });
      res.status(200).json({
        status: "success",
        message: `Successfully get all messages in conversation ${id_conversation}`,
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  },

  handlerSendChat: async (req, res, next) => {
    try {
      const { pengirim, penerima, pesan } = req.body;

      const userMessage = await Message.create({
        pengirim,
        penerima,
        pesan,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const botMessage = await Message.create({
        pengirim: penerima,
        penerima: pengirim,
        pesan: "Selamat Malam",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(200).json({
        status: "success",
        message: "Successfully chat bot",
        reply: botMessage.pesan,
      });
    } catch (error) {
      next(error);
    }
  },
};
