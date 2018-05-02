const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require("fs")

const jsurl = "http://www.ppvke.com/Blog/"

superagent.get(jsurl).end(function (err, res) {
    // 抛错拦截
    if(err){
        // return throw Error(err);
        return console.error(err)
    }
    // 等待 code

    let $ = cheerio.load(res.text)

    let arr = []

    $(".content .main-list .article-list .item").each(function (i,ele) {
        arr.push({
            detailUrl : $(ele).find(".j-lazy").parent().attr("href"),
            title:$(ele).find(".j-lazy").parent().attr("title"),
            imgUrl:$(ele).find(".j-lazy").attr("src"),
            imgDataOriginal:$(ele).find(".j-lazy").attr("data-original"),
        })
    })

    fs.writeFile(__dirname+'/data/article.json',JSON.stringify({
        status: 0,
        data: arr
    }),function (err) {
        if (err) throw err;
        console.log('写入完成');
    })

    console.log(arr)
});


// function getArticle(ele) {
//
//     superagent.get(ele.detailUrl).end(function (err, res) {
//         // 抛错拦截
//         if(err){
//             // return throw Error(err);
//             return console.error(err)
//         }
//         // 等待 code
//
//         let $ = cheerio.load(res.text)
//
//         let arr = []
//
//         $(".content .main-list .article-list .item").each(function (i,ele) {
//             arr.push({
//                 detailUrl : $(ele).find(".j-lazy").parent().attr("href"),
//                 title:$(ele).find(".j-lazy").parent().attr("title"),
//                 imgUrl:$(ele).find(".j-lazy").attr("src"),
//                 imgDataOriginal:$(ele).find(".j-lazy").attr("data-original"),
//             })
//         })
//
//         fs.writeFile(__dirname+'/data/article.json',JSON.stringify({
//             status: 0,
//             data: arr
//         }),function (err) {
//             if (err) throw err;
//             console.log('写入完成');
//         })
//
//         console.log(arr)
//     });
// }