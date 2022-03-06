const path = require("path");

function join(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    lintOnSave: false,
    // 调整 webpack 配置
    chainWebpack: config => {
        config.resolve.alias
            .set("views", join("src/views"))
            .set("utils", join("src/utils"))
            .set("components", join("src/components"));
    },
    // css相关配置
    css: {
        // 启用 CSS modules
        // requireModuleExtension: false,
        modules: false,
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    //lib-flexible源码中是按10等分的（refreshRem方法中 var rem = width / n;）
                    //这里由于设计图宽6400，所以修改了flexible.js文件按32等分，remUnit = 6400/32
                    require("postcss-px2rem")({
                        remUnit: 200
                    })
                ]
            }
        }
    },
    devServer: {
        open: true,
        // 反向代理配置
        proxy: {
            '/api/bigdata': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                ws: true, // 是否启用websockets
                pathRewrite: {
                    '^/api/bigdata': '/api/bigdata'
                }
            }
        }
    }
};