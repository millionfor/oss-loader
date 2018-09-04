var oss = require("ali-oss")
var co = require("co")
var fs = require("fs")

/**
 * 
 * @param {content} content buffer array, you
 * need change it into buffer using [Buffer.from()] 
 * @param {*} map 
 * @param {*} meta 
 */
function ossLoader(content, map, meta) {

    // initiate data 
    const callback = this.async();
    const filePath = this.resourcePath;
    const tempArr = filePath.split("/");
    const fileName = tempArr[tempArr.length - 1];

    const {alioss,folder} = this.query;

    if(typeof alioss !== "undefined" ){

        // start the client
        var client = new oss(alioss);
        // push buffer to ali-oss
        co(function* () {
            let stream = fs.createReadStream(filePath);
            let result = yield client.putStream( (folder ? folder : "") + fileName, stream);
            // var result = yield client.put(fileName, Buffers);
            if(result){
                callback(null,`module.exports='${result.url}'`,map,meta);
            }
        }).catch(function (err) {
            callback(err);
        });
    }else{
        callback("Your ali-oss configs is needed, Please Add it in [options.alioss]");
    }
};

module.exports = ossLoader;