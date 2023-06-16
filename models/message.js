function createModelMessage(Sequelize, DataTypes) {
    const Message = Sequelize.define(
      "Message",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        id_conversation: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        question: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        reply: {
          type: DataTypes.STRING(1000),
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
        tableName: "messages",
      }
    );
    return Message;
  }
  
  module.exports = createModelMessage;
  