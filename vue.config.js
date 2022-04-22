const path = require("path");

const resolve = dir => path.join(__dirname, dir);
console.log(resolve); 
// const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports = {
    lintOnSave: false,
  
    devServer: {
        hot: true,//热更新
        proxy:{
            '/api': {
                target: ' http://192.168.0.120:9898',//代理地址，这里设置的地址会代替axios中设置的baseURL
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' 
                
               }
        }}
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set("vue$", "vue/dist/vue.esm.js")
          .set("@", resolve("src"))
          .set("@assets", resolve("src/assets"))
          .set("@scss", resolve("src/assets/scss"))
          .set("@components", resolve("src/components"))
          .set("@plugins", resolve("src/plugins"))
          .set("@views", resolve("src/views"))
          .set("@router", resolve("src/router"))
          .set("@store", resolve("src/store"))
          .set("@layouts", resolve("src/layouts"))
          .set("@static", resolve("src/static"));
    },
   

  

}