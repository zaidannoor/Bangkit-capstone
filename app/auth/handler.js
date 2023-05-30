const bcrypt = require("bcrypt");
const {
  validateCreateUserSchema,
  validateLoginUserSchema,
} = require("../../validator/user");
const { User, Role } = require("../../models");
const generateAccessToken = require("../../utils/tokenManager");

module.exports = {
  handlerSignIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      validateLoginUserSchema({ email, password });
      const user = await User.findOne({
        where: {
          email: email,
        },
        include: [{ model: Role }],
      });
      if (!user) {
        throw new Error("User not found");
      }

      const passwordValidate = await bcrypt.compareSync(
        password,
        user.password
      );
      if (!passwordValidate) {
        throw new Error("Password Incorrect");
      }
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        id_role: user.id_role,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully login user",
        data: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.Role.roleName,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  handlerSignUp: async (req, res, next) => {
    try {
      const { userName, email, password } = req.body;
      validateCreateUserSchema(req.body);
      const checkEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        throw new Error("Email address has already used");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        userName,
        password: hashPassword,
        id_role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(200).json({
        status: "success",
        message: "Successfully register user",
        data: await User.findOne({
          attributes: { exclude: ["password", "img", "createdAt", "updatedAt"] },
          order: [["createdAt", "DESC"]],
        }),
      });
    } catch (error) {
      next(error);
    }
  },
};
