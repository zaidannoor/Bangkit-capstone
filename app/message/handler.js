const { default: fetch } = require("node-fetch");
const { User, Message} = require("../../models");

module.exports = {
    // Get all user image by his token id
  handlerGetMessage: async (req,res,next) => {
    try {
      const id_user = req.user.id;
      const messages = await Message.findAll({
        where: {
          sender: id_user,
        },
      });
      res.status(200).json({
        status: "success",
        message: `Successfully get all messages by user ${id_user}`,
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  },

  handlerSendMessage: async (req, res, next) => {
    try {
      const { question } = req.body;
      const response = await fetch('https://flask-chat-2vz2yxz7fq-as.a.run.app/get_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({question})
      })

      const responseJson = await response.json()
      const reply = responseJson.response
      console.log(reply)

      const message = await Message.create({
        sender: req.user.id,
        question,
        reply,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(200).json({
        status: "success",
        message: "Successfully chat bot",
        data: message,
      });
    } catch (error) {
      next(error);
    }
  },
};
