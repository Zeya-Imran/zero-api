// import globals from "globals";
// import pluginJs from "@eslint/js";

// export default [
//   {files: ["**/*.js"], languageOptions: {sourceType: "script"}},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];

import globals from "globals";
import pluginJs from "@eslint/js";

export default {
  overrides: [
    {
      files: ["**/*.js"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["**/*.js"],
      globals: globals.browser,
    },
    {
      files: ["**/*.js"],
      extends: ["plugin:@eslint/js/recommended"],
    },
  ],
};
