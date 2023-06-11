function applyExtraSetup(sequelize) {
  const { User, Role, Message} = sequelize.models;

  Role.hasMany(User, {
    foreignKey: "id_role",
    targetKey: "id",
  });

  User.belongsTo(Role, {
    foreignKey: "id_role",
    targetKey: "id",
  });

  User.hasMany(Message, {
    foreignKey: "sender",
    targetKey: "id",
  });

  Message.belongsTo(User, {
    foreignKey: "sender",
    targetKey: "id",
  });
}

module.exports = applyExtraSetup;
