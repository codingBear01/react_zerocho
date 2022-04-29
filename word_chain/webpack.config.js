const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  name: 'word-chain-setting',
  // if 실서비스 production
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'eval', // 작동을 빠르게
  // resolve 내 extensions에 등록한 확장자 entry에서 입력 생략 가능
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // input
  entry: {
    // client.jsx에서 이미 WordChain.jsx를 불러오기 때문에 따로 안 적어도 됨
    app: ['./client'],
  },
  // entry 내 작성한 파일 webpack과 연결
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: [
            // @babel/preset-env 설정 바꿔서 이전 버전 브라우저에도 최신 문법 적용 가능
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR'], // browserslist에서 옵션 확인 가능
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-refresh/babel',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new RefreshWebpackPlugin(),
  ],
  // output
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  },
  devServer: {
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
  },
};
