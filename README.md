# webpack 插件/loader
## 一个webpack插件，将静态资源自动部署至阿里云服务

```javascript
// 为了上传文件的Accesskey的安全请将秘钥文件添加至.gitignore
// 例如 .gitignore中添加
# key文件
/key.conf.js

// key.conf.js案例
module.exports = {
    region: 'oss-XX-XXXX',
    accessKeyId: 'XXXXXXX',
    accessKeySecret: 'XXXXXXX',
    bucket: 'XXXXXX'
}

// 您可以在webpack.conf.js中添加oss-loader和options

var ossOptions = require("./key.conf.js"); // 添加gitingore以后，引入您的阿里云key

{
    ...,
    module:{
        rules: [
            {
                test: /\.(png|jpg)$/i,
                use:[
                    {
                        loader:"oss-loader",
                        options:{
                            alioss: ossOptions,
                            folder: "bundles/" // 存储文件的文件夹，默认为bundles/请注意斜杠
                        }
                        }
                    }
                ]
            },
        ]
    },
    ...
}
```
## Installation 安装
在项目中添加
```
npm install oss-loader -D
```

