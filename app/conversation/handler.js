const { default: fetch } = require("node-fetch");
const { User, Message, Conversation } = require("../../models");

module.exports = {
  handlerCreateConversation: async (req,res,next) => {
    try {
      const id_user = req.user.id
      const newConversation = await Conversation.create({
        title: "New Conversation",
        id_user,
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
      const id_user = req.user.id
      const conversations = await Conversation.findAll({
        where: {
          id_user,
        },
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
      const { id } = req.params;
      const messages = await Message.findAll({
        where: {
          id_conversation: id,
        },
        attributes: { exclude: ["createdAt"] },
      });

      res.status(200).json({
        status: "success",
        message: `Successfully get all messages in conversation ${id}`,
        chatResult: messages,
      });
    } catch (error) {
      next(error);
    }
  },

  handlerSendChat: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { question } = req.body;

      // change title to first question chat    
      const getConversation = await Conversation.findByPk(id);
      if (!getConversation) {
        throw new Error("Conversation not found");
      }
      if(getConversation.title == "New Conversation"){
        await getConversation.update({
          title: question
        })
      }

      // Get Reply from Machine Learning Service
      const response = await fetch('https://flask-chat-2vz2yxz7fq-as.a.run.app/get_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question})
      })

      const responseJson = await response.json()
      const reply = await responseJson.response

      const message = await Message.create({
        id_conversation: id,
        question,
        reply,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await res.status(200).json({
        status: "success",
        message: "Successfully chat bot",
        chatResult: message,
      });
    } catch (error) {
      next(error);
    }
  },

};
