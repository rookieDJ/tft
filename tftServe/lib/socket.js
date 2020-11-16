// 优化log
const chalk = require('chalk');
const log = console.log
const io = require('socket.io');
io.sockets.on('connection', (socket) => {
    log(chalk.green('连接成功',socket.id))
    socket.on('chatmessage', (msg) => {
        io.sockets.connected[socket.id].emit('user', msg.value); // 指定发送
        socket.emit('user', msg.value); // 广播
    });
    socket.on('disconnect', () => { // 关闭链接的时候会执行
        log(chalk.green('user disconnected'))
    });
});


module.exports = io