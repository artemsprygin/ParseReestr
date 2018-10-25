var needle = require("needle");
var cheerio = require("cheerio");
var async = require("async");

var resMy = [];
var aUrl = [];
aUrl[0] = "https://rosreestr.net/kadastr/69-36-0000000-32";
aUrl[1] = "https://rosreestr.net/kadastr/69-36-0000000-31";
aUrl[2] = "https://rosreestr.net/kadastr/69-36-0000000-30";


var q = async.queue(function(url){
        needle.get(url,function(err,res){
        if(err) throw(err);
        
        var $ = cheerio.load(res.body);

        $('.test__data').each(function(i, element) {
            var start = $(this).find('div').text().search("Кадастровая стоимость: ");
            var firstcut = $(this).find('div').text().substring(start);
            var stop = firstcut.search("руб.");
            var lastcut = firstcut.substring(23,stop);
            resMy.push(lastcut.split(' ').join(''));
            console.log(resMy);
        })
        var resNum = resMy.reduce(function(prev, curr){
            return (Number(prev) || 0) + (Number(curr) || 0);
        });
        console.log(resNum);
        });
    },10);

var i = 0;
while(aUrl.length > i)
{
    q.push(aUrl[i]);
    i++;
}