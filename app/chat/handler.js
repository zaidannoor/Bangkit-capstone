const { User, Role, Message } = require("../../models");

module.exports = {
    handlerGetChat: async (req,res,next) => {
        try {
            const messages = await Message.findAll({
              where: {
                pengirim: 1,
              },
              include: [
                {
                  model: User,
                  as: "Penerima",
                  attributes: ["id","userName"],
                },
              ],
              attributes: { exclude: ["createdAt", "updatedAt", "penerima"] },
            });
            res.status(200).json({
              status: "success",
              message: "Successfully get all messages",
              data: messages           
            });
          } catch (error) {
            next(error);
          }
    },

    handlerSendChat: async (req,res,next) => {
        try{
            const {pengirim,penerima,pesan} = req.body;

        const userMessage = await Message.create({
            pengirim,
            penerima,
            pesan,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const botMessage = await Message.create({
            pengirim: penerima,
            penerima: pengirim,
            pesan: "Selamat Malam",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.status(200).json({
            status: "success",
            message: "Successfully chat bot",
            reply: botMessage.pesan
        });
        }
        catch(error){
            next(error)
        }
        
    }   
}