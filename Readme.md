# ducks

## Background

This is a duck simulation app.

## Initial setup

`npm init -y`

`npm i typescript webpack webpack-cli webpack-dev-server ts-loader --save-dev`

`npx tsc --init`

<details>
  <summary>webpack.config.js</summary>

```
const path = require('path');

module.exports = {
entry: path.join(**dirname, '/index.ts'),
output: {
filename: 'index.js',
path: **dirname
},
module: {
rules: [
{
test: /\.tsx?$/,
loader: 'ts-loader',
exclude: /node_modules/,
},
]
},
resolve: {
extensions: [".tsx", ".ts", ".js"]
},
};

```

</details>
<details>
  <summary>package.json</summary>

```

...
"scripts": {
"start": "webpack serve --mode development"
}
...

```

</details>
