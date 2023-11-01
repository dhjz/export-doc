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
      plugins: [terser()] // terser(), uglify()
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