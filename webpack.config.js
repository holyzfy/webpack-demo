const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    var dist = __dirname + '/dist';
    var dev = argv.mode === 'development';
    var hash = dev ? '' : '.[contenthash]';
    return {
        entry: {
            app: './jsnext/app.js'
        },
        output: {
            path: dist,
            hashDigestLength: 7,
            filename: `[name]${hash}.js`,
            chunkFilename: `[id]${hash}.js`
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        dev ? 'style-loader': MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-preset-env')()
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
                            plugins: ['@babel/plugin-transform-runtime']
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin([dist]), 
            new MiniCssExtractPlugin({
                filename: `[name]${hash}.css`,
                chunkFilename: `[id]${hash}.css`
            }),
            new HtmlWebpackPlugin({
                template: 'index.html'
            })
        ]
    };
};
