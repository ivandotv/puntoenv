/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json')
const { execSync } = require('child_process')

const plugins = []

//default babel config
const config = { plugins }

//babel config for Jest tests
const jestConfig = {
  plugins,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  ignore: ['node_modules'],
  sourceMaps: 'inline'
}

module.exports = process.env.NODE_ENV === 'test' ? jestConfig : config
