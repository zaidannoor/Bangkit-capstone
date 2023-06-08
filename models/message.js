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
        pengirim: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        penerima: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pesan: {
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
        tableName: "messages",
      }
    );
    return Message;
  }
  
  module.exports = createModelMessage;
  