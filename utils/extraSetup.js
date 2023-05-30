function applyExtraSetup(sequelize) {
    const { User, Role, Message } = sequelize.models;
  
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
    });
  
    Message.belongsTo(User, {
      foreignKey: "penerima",
      targetKey: "id",
    });
  }
  
  module.exports = applyExtraSetup;
  