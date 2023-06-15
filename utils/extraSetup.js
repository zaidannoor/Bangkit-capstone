function applyExtraSetup(sequelize) {
  const { User, Message, Conversation} = sequelize.models;

  User.hasMany(Conversation, {
    foreignKey: "id_user",
    targetKey: "id"
  })
  Conversation.belongsTo(User, {
    foreignKey: "id_user",
    targetKey: "id"
  })

  Conversation.hasMany(Message, {
    foreignKey: "id_conversation",
    foreignKey: "id"
  })
  Message.belongsTo(Conversation, {
    foreignKey: "id_conversation",
    foreignKey: "id"
  })


}

module.exports = applyExtraSetup;
