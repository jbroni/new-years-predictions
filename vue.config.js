module.exports = {
  css: {
    loaderOptions: {
      sass: {
        api: "modern",
        implementation: require("sass"),
      },
      scss: {
        api: "modern",
        implementation: require("sass"),
      },
    },
  },
};
