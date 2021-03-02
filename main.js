const fs = require('fs');
const csv = require('csv');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
console.log('初期データ');
//処理（跡でpipeに食べさせる）
const parser = csv.parse((error, data) => {
    //変換後の配列を格納
    let newData = [];
    let total = 0;

    //ループしながら１行ずつ処理
    data.forEach((element, index, array) => {
        let row = [];
        row.push(element[0]);
        row.push(element[1]); //2カラム目を大文字へ
        row.push(element[2]);
        //新たに1行分の配列(row)を作成し、新配列(newData)に追加。
        newData.push(row);

        total += Number(element[1]);
    })
    console.log('total ' + total);
    console.log('ave ' + (total / data.length));

    //内容出力
    console.log('初期データ');
    console.log(data);

    //console.log('処理データ');
    //console.log(newData);

    //write
    /*csv.stringify(newData,(error,output)=>{
        fs.writeFile('out.csv',output,(error)=>{
            console.log('処理データをCSV出力しました。');
        })
    })*/
})

app.on('ready', () => {
    // mainWindowを作成（windowの大きさや、Kioskモードにするかどうかなどもここで定義できる）
    mainWindow = new BrowserWindow(
        {
            webPreferences: {
            nodeIntegration: true
            },
            width: 800, 
            height: 600
        }
    );
    // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    
    // ChromiumのDevツールを開く
    mainWindow.webContents.openDevTools();

    
    //fs.createReadStream('202102.csv', {encoding: 'utf-8'}).pipe(parser);
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
