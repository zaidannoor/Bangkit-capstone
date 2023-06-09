function applyExtraSetup(sequelize) {
  const { User, Role, Message, Conversation } = sequelize.models;

  Role.hasMany(User, {
    foreignKey: "id_role",
    targetKey: "id",
  });

  User.belongsTo(Role, {
    foreignKey: "id_role",
    targetKey: "id",
  });

  User.hasMany(Message, {
    foreignKey: "pengirim",
    targetKey: "id",
  });

  User.hasMany(Message, {
    foreignKey: "penerima",
    targetKey: "id",
  });

  Message.belongsTo(User, {
    foreignKey: "pengirim",
    targetKey: "id",
    as: "Pengirim",
  });

  Message.belongsTo(User, {
    foreignKey: "penerima",
    targetKey: "id",
    as: "Penerima",
  });

  Conversation.hasMany(Message, {
    foreignKey: "id_conversation",
    targetKey: "id",
  });

  Message.belongsTo(Conversation, {
    foreignKey: "id_conversation",
    targetKey: "id",
  });
}

module.exports = applyExtraSetup;
