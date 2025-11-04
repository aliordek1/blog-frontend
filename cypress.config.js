const { defineConfig } = require("cypress");
const createEsbuildPlugin =
  require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
  require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;

module.exports = defineConfig({

  // VİDEO KAYDINI AÇMAK İÇİN BU SATIRI EKLEDİK
  video: true,

  e2e: {
    async setupNodeEvents(on, config) {
      // Bu, .feature dosyalarını bulabilmesi için GEREKLİDİR
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Yapılandırmayı geri döndür
      return config;
    },
    // Cypress'e .js dosyaları yerine .feature dosyalarını aramasını söylüyoruz
    specPattern: "**/*.feature",
  },
}); 