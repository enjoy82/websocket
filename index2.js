const app = require('express')()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 1337;

// 関数
// 数字を２桁の文字列に変換
const toDoubleDigitString =( num ) =>{
    return ( "0" + num ).slice( -2 );   // slice( -2 )で後ろから２文字取り出す。
};

// 時刻文字列の作成（書式は「YY/DD/MM hh:mm ss」）
const makeTimeString =( time ) =>{
    return toDoubleDigitString( time.getFullYear() ) + '/' + toDoubleDigitString( time.getMonth() + 1 ) + '/' + toDoubleDigitString( time.getDate() )
        + ' ' + toDoubleDigitString( time.getHours() ) + ':' + toDoubleDigitString( time.getMinutes() ) + ' ' + toDoubleDigitString( time.getSeconds() );
}


app.get('/', (req, res) => {
    console.log("Node Server is running!");
    res.send("Node Server is running. Yay!!")
})

//Socket Logic
const socketio = require('socket.io')(http)

socketio.on("connection", (userSocket) => {
    console.log("user connected");
    let strNickname = '';
    userSocket.on('join', ( strNickname_ ) =>{
        console.log( 'joined :', strNickname_ );
        // コネクションごとで固有のニックネームに設定
        strNickname = strNickname_;
    } );


    userSocket.on("message", (data) => {
        console.log("Received: " + data);
        const strNow = makeTimeString( new Date() );
        const objMessage = {
            strNickname: strNickname,
            strMessage: message,
            strDate: strNow
        }
        userSocket.broadcast.emit("receive_message", data)
    })
})

http.listen(process.env.PORT, ()=>{
    console.log( 'Server on port %d', PORT );
});
