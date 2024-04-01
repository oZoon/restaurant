import i18next from "i18next"
import languageDetector from "i18next-browser-languagedetector"

import translation from "./ru/translation.json"

i18next.use(languageDetector).init({
  debug: false,
  resources: {
    ru: {
      translation,
    },
  },
})
