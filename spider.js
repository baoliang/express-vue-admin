const puppeteer = require('puppeteer'); // 无头浏览器
const request = require('request'); // 文件下载
const Async = require('async'); // 处理下载并发
const fs = require('fs'); // nodejs文件操作模块

var cheerio = require('cheerio');

let products = [{
        productId: 138,
        url: 'https://www.unice.com/unice-3-bundles-peruvian-curly-human-hair-with-lace-closure.html',
        pages: 8
    },
    {
        productId: 135,
        url: 'https://www.unice.com/unice-3-bundles-virgin-deep-wave-human-hair-with-lace-closure.html',
        pages: 21
    },
    {
        productId: 144,
        url: 'https://www.unice.com/unice-4-bundles-brazilian-virgin-curly-hair-with-lace-closure.html',
        pages: 11
    },
    {
        productId: 146,
        url: 'https://www.unice.com/unice-4pcs-brazilian-body-wave-hair-bundles-with-lace-closure.html',
        pages: 19
    },
    {
        productId: 147,
        url: 'https://www.unice.com/unice-hair-kysiss-series-peruvian-4-bundles-deep-wave-virgin-hair-with-lace-closure.html',
        pages: 2
    },
    {
        productId: 127,
        url: 'https://www.unice.com/unice-brazilian-human-virgin-hair-straight-3-bundles.html',
        pages: 32
    },
    {
        productId: 139,
        url: 'https://www.unice.com/unice-kysiss-3pcs-pack-peruvian-deep-human-hair-weaves.html',
        pages: 2
    },
    {
        productId: 134,
        url: 'https://www.unice.com/3-pcs-lot-unice-hair-brazilian-body-wave-virgin-hair.html',
        pages: 39
    },
    {
        productId: 133,
        url: 'https://www.unice.com/unice-3-bundles-water-wave-virgin-human-hair.html',
        pages: 23
    },
    {
        productId: 140,
        url: 'https://www.unice.com/unice-kysiss-3pcs-pack-brazilian-loose-wave-virgin-human-hair.html',
        pages: 2
    },
]
let index = 9
let reviewIdstart = 17300
let productId = products[index].productId;
let pagenum = products[index].pages; // 需要爬虫多少个页面的文件
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
var downloadImage = function(src, dest, callback) {
    request.head(src, function(err, res, body) {
        if (src) {
            // request中间件，以流的方式写入文件
            request(src).pipe(fs.createWriteStream(dest)).on('close', function() {
                callback(null, dest);
            });
        }
    });

};


function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
                // and double/single quotes
        }
    });
}
let sql = ''
    // sql += `delete from oc_review where product_id; 
    // delete from oc_cireview;
    //  delete from oc_cireview_rating; 
    //  delete from oc_cireview_image;
    //  delete from oc_cireview_image; 
    //  delete from oc_cireview_image_description; `

  
var str = "aporhjbmvncjrovmbxvzzoeclolmqlpvsdffgfgf";  
function ss(a, b) {    
    var fanhui = "";    
    for (var i = 0; i < b; i++) {      
        var aa = Math.floor(Math.random() * (str.length));      
        fanhui += str.substring(aa, aa + 1);    
    }
    return fanhui  
}
ss(str, 1) ** ss(str, 2)

const NeteaseImg = async() => {
    const getOnePageData = async(page, pageNumber) => {
        const url = `${products[index].url}?___store=default&feedback=1&r_p=${pageNumber}&currency=CAD#feedback#feedback`; // 动态url地址
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 }); // 跳转到页面    并且页面加载完成


        const elements = await page.evaluate(() => {
            return document.body.innerHTML
        });

        return elements

    };


    // 循环获取数据
    let imgList = [];
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] }); // 打开一个浏览器
    const page = await browser.newPage(); // 新建页面
    let filelen = 0; // 当前页面的有多少条数据
    for (let i = 1; i <= pagenum; i++) {
        const item = await getOnePageData(page, i); // 动态把url路径传回getOnePageData
        const $ = cheerio.load(item);
        const reviewDd = $('.review-dd')
        const reviewDt = $('.review-dt')
        for (let k = 0; k < reviewDd.length; k++) {
            let img = null
            const imgs = $(reviewDd[k]).find('img')
            if (imgs.length > 0) {
                img = imgs[0].attribs.src
                imgList.push(`wget ${img}`)

                img = img.split('/')[img.split('/').length - 1]

            }
            let small = $(reviewDt[k]).find('small')
            let dateS = small[0].children[0].data.split('/')
                // if(small[k].children && small[k].children.length > 0) {
                // console.log(small[k].children[0].data,'----')
                // }

            const li = reviewDd.find('li').find('.value-review-attr')
            let comment = li[k].children[0].data
            if (comment) {
                comment = mysql_real_escape_string(comment)
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                comment = comment.replace("’", "'")
                let date = null
                if (dateS[2] === '19' && parseInt(dateS[1]) > 7) {
                    date = `20${dateS[2]}-${dateS[0]}-${dateS[1]}`
                } else {
                    date = `20${dateS[2]}-${dateS[1]}-${dateS[0]}`
                }
                if (comment.indexOf('Unic') == -1 && comment.indexOf('unic') == -1 && comment.indexOf('UNice') == -1 && comment.indexOf('UNICE') == -1 && comment.indexOf('UNIce') == -1 && comment.toLowerCase().indexOf('unic') == -1) {
                    sql += `INSERT INTO oc_review  (review_id,product_id, customer_id, author, text, rating, status, date_added, date_modified)
        VALUE
            (${reviewIdstart}, ${productId}, 0, "${ss(str, 1).toUpperCase()}**${ss(str, 1)}","${comment}", 5, 1, '${date}', '${date}');    
        `
                    sql += `INSERT INTO oc_cireview (cireview_id,review_id, product_id, imp, store_id, language_id, email, title, comment, coupon_code, coupon_id, reward_points, customer_reward_id)
        VALUES
            (${reviewIdstart},${reviewIdstart}, ${productId}, 0, 0, 1, '', '', '', '', 0, 0, 0);
        
        `
                    sql += `INSERT INTO oc_cireview_rating (cireview_id, review_id, product_id, ciratingtype_id, ciratingtype_name, rating, status)
            VALUES
    (${reviewIdstart}, ${reviewIdstart} , ${productId}, 1, '{\"1\":\"Rating\"}', 5, 1);
    `
                    if (img) {

                        sql += `INSERT INTO oc_cireview_image (cireview_image_id, cireview_id, image, mask, ext, sort_order, session_id, status)
            VALUES
            (${reviewIdstart}, ${reviewIdstart}, 'catalog/cireviewpro_images/${img}', 'cc', 'jpg', 0, 'fvps61i352ekuupm04abde3ifn', 1);
    
            `

                        sql += `INSERT INTO oc_cireview_image_description (cireview_image_id, cireview_id, language_id, title, alt, session_id)
            VALUES
            (${reviewIdstart}, ${reviewIdstart}, 1, '${img}', '${img}', 'fvps61i352ekuupm04abde3ifn');
    `
                    }




                }
                reviewIdstart++
            }

        }
        //imgList = imgList.concat(item);
    }

    // ;
    fs.writeFile('Output.txt', sql, (err) => {

        // In case of a error throw err. 
        if (err) throw err;
    })
    imgList.forEach(function(i) {
            console.log(i)
        })
        // Async.mapSeries(imgList, function(item, callback) {
        //     setTimeout(function() {
        //         // 截取文件名
        //         var destImage = path.resolve("./images/", item.split("/")[item.split("/").length -1]);
        //         downloadImage(item, destImage, function(err, data){
        //             console.log("["+ index++ +"]: " + data);
        //         });
        //         callback(null, item);
        //     }, 100);
        // }, function(err, results) {});




    browser.close();

};

NeteaseImg();
