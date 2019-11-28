module.exports={

    // productionSourceMap: false,
    devServer: {
        port: 80, // 端口号
        proxy: {

            '/poseidon': {
                // target: 'http://118.31.43.78:8081',
                target: 'http://localhost:8081',
                changOrigin: true,
                pathRewrite: {
                    "^/poseidon": "",
                }
            },
            'dolphinData':{
                target: 'http://localhost:8821',
                changOrigin: true,
                pathRewrite: {
                    "^/dolphinData": "",
                }
            },
            '/extendData': {
                // target: 'http://120.27.234.5',
                target: 'http://localhost:8083',
                changOrigin: true,
                pathRewrite: {
                    "^/extendData": "",
                }
            },
            '/out': {
                // target: 'http://ds.unmeteo.com',
                target: 'http://psd.unmeteo.com',
                changOrigin: true,
                pathRewrite: {
                    // "^/ais-service": "",
                    // "^/ais-service": "",
                }
            }

        },

    },
    chainWebpack: config => {
        config.module.rule('glsl')
            .test(/\.glsl$/)
            .use('webpack-glsl-loader')
            .loader('webpack-glsl-loader');
    },
    runtimeCompiler: undefined,
    publicPath: './',
    outputDir: undefined,
    assetsDir: undefined,
    productionSourceMap: undefined,
    parallel: undefined,


    css: {
        extract: false,
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    }
};
