function createModelMessage(Sequelize, DataTypes) {
    const Message = Sequelize.define(
      "Message",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        pengirim: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        penerima: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.STRING,
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
  