module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    path: __dirname + "/build",
    filename: "index.js",
    libraryTarget: "umd",
    library: "tradetrust-react-components"
  },
  externals: {
    react: "react"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
