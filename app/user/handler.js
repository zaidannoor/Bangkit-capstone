const { User, Role } = require("../../models");

module.exports = {
  handlerGetUser: async (req, res, next) => {
    try {
      const users = await User.findAll();

      res.status(200).json({
        status: "success",
        message: "Successfully get all Users",
        userResult: users.map((x) => ({
          id: x.id,
          userName: x.userName,
          email: x.email,
        })),
      });
    } catch (error) {
      next(error);
    }
  },

  handlerGetDetailUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({
        status: "success",
        message: "Successfully detail user",
        userResult: {
          id: user.id,
          email: user.email,
          userName: user.userName,
          image: user.img,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  handlerChangeProfileUser: async (req, res, next) => {
    try {
      const id = req.user.id;
      const { userName } = req.body;

      const getUser = await User.findByPk(id);
      if (!getUser) {
        throw new Error("User not found");
      }

      await getUser.update({
        userName
      })

      res.status(201).json({
        status: "success",
        message: "Successfully Update User Profile",
      });

    } catch (error) {
      next(error);
    }
  },
};
