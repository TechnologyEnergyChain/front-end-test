import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "semi": ["error", "never"],
      "quotes": ["error", "single"],
      "yoda": ["error", "always"]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

];
