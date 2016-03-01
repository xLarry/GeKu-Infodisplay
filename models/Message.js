module.exports = function(sequelize, DataTypes) {

    var Message = sequelize.define('message', {
        content: {type: DataTypes.STRING}
    });

    Message.sync({force: true}).then(function(){
        Message.create({
            content: 'asdf'
        })
    });

    return Message;
};