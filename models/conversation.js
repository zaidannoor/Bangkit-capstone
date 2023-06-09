function createModelMessage(Sequelize, DataTypes) {
    const Conversation = Sequelize.define(
      "Conversation",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        topic: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        tableName: "conversations",
      }
    );
    return Conversation;
  }
  
  module.exports = createModelMessage;
  