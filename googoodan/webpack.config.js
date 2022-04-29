const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'goo-goo-dan-setting',
  mode: 'development', // 서비스 시 production
  devtool: 'eval', // 서비스 시 hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    app: ['./client'],
  },
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
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    ],
  },
  // loader에 option 추가하는 plugin
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
};
