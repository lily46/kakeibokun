const fs = require('fs');
const csv = require('csv');

let mainWindow = null;
var now = new Date();

function GetCsvList(callback){
    fs.readdir('.', function(err, files){
        if (err) throw err;
        var fileList = [];
        files.filter(function(file){
            return fs.statSync(file).isFile() && /.*\.csv$/.test(file); //絞り込み
        }).forEach(function (file) {
            fileList.push(file);
        });
        callback(fileList);
    });
}

function MakeTable(id){
    let csvData = {};
    //処理（跡でpipeに食べさせる）
    const parser = csv.parse((error, data) => {

        //変換後の配列を格納
        let total = 0;

        $('#kakeibo').html('');

        //内容出力
        console.log(data);

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
    csvData = fs.createReadStream(id, {encoding: 'utf-8'});
    csvData.pipe(parser);  
}

$(function(){
    $('#make').on('click', function() {
        var id = '202102.csv';
        MakeTable(id);
    });

    $(document).on("click", '.dropdown-menu .dropdown-item', function(){
        var visibleItem = $('.dropdown-toggle', $(this).closest('.dropdown'));

        var id = $(this).attr('value');
        console.log(id);
        MakeTable(id);
    });
});

MakeTable('202102.csv');


var func = function(months){
    var monthStr = "";
    months.forEach(function(element){
        monthStr += '<li><button class="dropdown-item clear-decoration" value="' + element + '">' + element + '</button></li>';
    });
    $('#months').html(monthStr);
}
GetCsvList(func);