const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    var dist = __dirname + '/dist';
    var dev = argv.mode === 'development';
    var production = !dev;
    var hash = dev ? '' : '.[contenthash]';

    var plugins = [
        new CleanWebpackPlugin([dist]), 
        new MiniCssExtractPlugin({
            filename: `[name]${hash}.css`,
            chunkFilename: `[name]${hash}.css`
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'list.html',
            template: 'list.html',
            chunks: ['list']
        })
    ];
    production && plugins.push(...[
        new BundleAnalyzerPlugin()
    ]);

    return {
        entry: {
            polyfill: '@babel/polyfill',
            app: './jsnext/app.js',
            list: './jsnext/list.js'
        },
        output: {
            path: dist,
            hashDigestLength: 7,
            filename: `[name]${hash}.js`,
            chunkFilename: `[name]${hash}.js`
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        dev ? {
                            loader: 'style-loader',
                            options: {
                                sourceMap: true,
                                convertToAbsoluteUrls: true
                            }
                        } : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: dev
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-preset-env')({
                                        browsers: 'last 2 versions' 
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
                            }
                        }
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|libs)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: dev ? 1 : 8192,
                                name: dev ? `[name].[ext]` : `[name].[hash:7].[ext]`
                            }
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                disable: dev
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: true,
                                removeAttributeQuotes: false
                            }
                        }
                    ]
                }
            ]
        },
        plugins,
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true
                }),
                new OptimizeCSSAssetsPlugin() 
            ]
        }
    };
};
