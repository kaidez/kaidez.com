module.exports = {
  entry: {
    globals: "./webpack/entry_GLOBALS",
    posts: "./webpack/entry_POSTS"
  },
  output: {
    path: "wp-content/themes/kaidez-swiss/js/",
    filename: "[name].js"
  }
};