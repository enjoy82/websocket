/*const server = require("ws").Server;
const s = new server({ port: 1337 });
console.log("server is opened");

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


s.on("connection", ws => {
    console.log("connected");
    let strNickname = '';

    ws.on('join', ( strNickname_ ) =>{
        console.log( 'joined :', strNickname_ );
        // コネクションごとで固有のニックネームに設定
        strNickname = strNickname_;
    } );

    ws.on('message', message => {

        console.log("Received: " + message);
        //ws.send("送信してきたクライアントのみに返す - " + message);
        const strNow = makeTimeString( new Date() );
        const objMessage = {
            strNickname: strNickname,
            strMessage: message,
            strDate: strNow
        }

        s.clients.forEach(client => {
            client.send(message);
        });

        s.clients.forEach(client => {
            if (client !== ws)
                client.send('接続している自分以外のクライアント全てに送信 - '+ message);
        });
    });

    ws.on('close', () => {
        console.log('I lost a client');
    });
});*/

const server = require("ws").Server;
const s = new server({ port: 1337 });
console.log("server is opened");

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


s.on("connection", ws => {
    console.log("connected");
    let strNickname = 'no name';

    ws.on('message', data => {
        console.log(data);      
        var message = JSON.parse(data);
        //console.log(message.action);
        var strNow;
        
        switch(message.action){

            case 'join':
                strNow = makeTimeString( new Date() );
                console.log( 'joined :', message.name + '\ntime:' + strNow);
                // コネクションごとで固有のニックネームに設定
                strNickname = message.name;
                break;

            case 'send':
                strNow = makeTimeString( new Date() );
                console.log("Received: " + message.text + "[from " + strNickname + "]" + '\ntime:' + strNow);
                //write send massage
                break;

                
        }
        //ws.send("送信してきたクライアントのみに返す - " + message);
        const objMessage = {
            strNickname: strNickname,
            strMessage: message,
            strDate: strNow
        }

        /*s.clients.forEach(client => {
            client.send(message);
        });*/

        /*s.clients.forEach(client => {
            if (client !== ws)
                client.send('接続している自分以外のクライアント全てに送信 - '+ message);
        });*/
        
    });

    ws.on('close', () => {
        console.log('I lost a client');
    });
});