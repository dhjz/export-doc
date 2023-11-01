## rollup
### 一些能力
- rollup-plugin-alias: 提供modules名称的 alias 和reslove 功能
- rollup-plugin-babel: 提供babel能力
- rollup-plugin-eslint: 提供eslint能力
- rollup-plugin-node-resolve: 解析 node_modules 中的模块
- rollup-plugin-commonjs: 转换 CJS -> ESM, 通常配合上面一个插件使用
- rollup-plugin-serve: 类比 webpack-dev-server, 提供静态服务器能力
- rollup-plugin-filesize: 显示 bundle 文件大小
- rollup-plugin-uglify: 压缩 bundle 文件
- rollup-plugin-terser: 压缩文件, 支持 ES6+ 语法，更加兼容现代化浏览器, 推荐使用
- rollup-plugin-replace: 类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分 Development 与 Production 环境.
- rollup-plugin-json  @rollup/plugin-json: 支持import json文件 import { name } from './data.json';

### 打包格式
1. amd – 异步模块定义，用于像RequireJS这样的模块加载器
2. cjs – CommonJS，适用于 Node 和 Browserify/Webpack
3. es – 将软件包保存为ES模块文件
4. iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
5. umd – 通用模块定义，以amd，cjs 和 iife 为一体

### 使用插件
```shell
# 压缩代码
# npm i rollup-plugin-uglify -D
npm i @rollup/plugin-terser -D
# babel转码
npm i @rollup/plugin-babel @babel/core @babel/plugin-external-helpers @babel/preset-env @babel/plugin-transform-runtime -D
# 可选: 以插件的形式在打包时引入到文件里，主要的功能是为api提供沙箱的垫片方案，更因此适合用在第三方的开发产品中（开发工具包，库），一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用。 "plugins": ["transform-runtime"]
npm i @babel/plugin-transform-runtime -D
# 支持commonjs
npm i @rollup/plugin-commonjs -D
# 支持打包npm 模块
npm i @rollup/plugin-node-resolve -D

# 终版
npm i rollup @rollup/plugin-terser @rollup/plugin-commonjs @rollup/plugin-node-resolve  -D
npm i @rollup/plugin-babel @babel/core @babel/plugin-external-helpers @babel/preset-env @babel/plugin-transform-runtime -D
```
- .babelrc
```js
{
  "presets": ["@babel/env"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

### 示例 rollup.config.js
- package.json 配置 "type": "module",
```js
import terser from '@rollup/plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import '@babel/plugin-transform-runtime'

const env = process.env.NODE_ENV

const config =  {
  input: 'src/main.js',
  // external: ['file-saver', 'html2canvas'], // 排除依赖插件
  output: [
    {
      file: './dist/export-doc.js',
      format: 'iife',
      name: 'ExportDoc'
    },
    {
      file: './dist/export-doc.min.js',
      format: 'iife',
      name: 'ExportDoc',
      plugins: [terser()]
    }
  ],
  watch: {
    exclude: 'node_modules/**'
  },
  plugins: [
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      // plugins: ['external-helpers'],
      babelHelpers: 'runtime', 
      'plugins': [
        ['@babel/plugin-transform-runtime', {
          'regenerator': true
        }]
      ]
    }),
    resolve({
      customResolveOptions: {
        moduleDirectories: ['node_modules']
      }
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config

```