const fs = require('fs');
const csv = require('csv');

let mainWindow = null;
console.log('初期データ');
var now = new Date();

let global_data = fs.createReadStream('202102.csv', {encoding: 'utf-8'});
//処理（跡でpipeに食べさせる）
const parser = csv.parse((error, data) => {
    //変換後の配列を格納
    let total = 0;

    $('#kakeibo').html('');

    //内容出力
    console.log('初期データ');
    console.log(data);

    //ループしながら１行ずつ処理
    data.forEach((element, index, array) => {
        total += Number(element[1]);
        const tags = element[2].split(' ');
        let tagStr = '';
        tags.forEach(
            element => tagStr += '<span class="badge badge-secondary">' + element + '</span> '
        );

        $('#kakeibo').append('<tr><td>' + element[0] + '</td><td>' + element[1] + '</td><td>' + tagStr +'</td></tr>');
    })
    console.log('total ' + total);
    console.log('ave ' + (total / data.length));
    $('#total').html(total + " 円");
    let ave = Math.round(total / now.getDate() * 10) / 10;
    $('#average').html(ave + " 円");

})

$('#make').on('click', function() {
    global_data.pipe(parser);  
});

