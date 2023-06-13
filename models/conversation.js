function createModelMessage(Sequelize, DataTypes) {
    const Message = Sequelize.define(
      "Conversation",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        id_user: {
          type: DataTypes.INTEGER,
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
    return Message;
  }
  
  module.exports = createModelMessage;
  