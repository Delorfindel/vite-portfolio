module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/vue3-recommended",
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    semi: [2, "always"],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    "no-unused-vars": "error",
  },
};
