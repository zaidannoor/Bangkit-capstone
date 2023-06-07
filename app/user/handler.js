const { User, Role } = require("../../models");

module.exports = {
  handlerGetUser: async (req, res, next) => {
    try {
      const users = await User.findAll();

      res.status(200).json({
        status: "success",
        message: "Successfully get all Users",
        data: users.map((x) => ({
          id: x.id,
          userName: x.userName,
          email: x.email,
          password: x.password,
          createdAt: x.createdAt,
          updatedAt: x.updatedAt,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
};
