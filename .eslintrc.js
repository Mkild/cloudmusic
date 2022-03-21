module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    quotes: [1, 'single'], // 引号类型 `` "" ''
    semi: [2, 'never'], // 语句强制分号结尾
    'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
    'vue/script-indent': [
      'error',
      2,
      {
        // script标签缩进设置
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off', // 关闭.vue默认缩进规则
      },
    },
  ],
}
