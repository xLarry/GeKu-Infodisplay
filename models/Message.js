module.exports = function(sequelize, DataTypes) {

    var Message = sequelize.define('message', {
        content: {type: DataTypes.STRING}
    });

    Message.sync();

    return Message;
};