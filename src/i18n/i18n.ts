import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import commonTranslationEN from "@/i18n/locales/en/common.json";
import commonTranslationFR from "@/i18n/locales/fr/common.json";
import commonTranslationES from "@/i18n/locales/es/common.json";
import commonTranslationAR from "@/i18n/locales/ar/common.json";
import homeTranslationEN from "@/i18n/locales/en/home.json";
import homeTranslationFR from "@/i18n/locales/fr/home.json";
import homeTranslationES from "@/i18n/locales/es/home.json";
import homeTranslationAR from "@/i18n/locales/ar/home.json";
import notFoundTranslationEN from "@/i18n/locales/en/not-found.json";
import notFoundTranslationFR from "@/i18n/locales/fr/not-found.json";
import notFoundTranslationES from "@/i18n/locales/es/not-found.json";
import notFoundTranslationAR from "@/i18n/locales/ar/not-found.json";

const isProduction = import.meta.env.PROD;

const resources = {
  en: {
    common: commonTranslationEN,
    "not-found": notFoundTranslationEN,
    home: homeTranslationEN,
  },
  fr: {
    common: commonTranslationFR,
    "not-found": notFoundTranslationFR,
    home: homeTranslationFR,
  },
  es: {
    common: commonTranslationES,
    "not-found": notFoundTranslationES,
    home: homeTranslationES,
  },
  ar: {
    common: commonTranslationAR,
    "not-found": notFoundTranslationAR,
    home: homeTranslationAR,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: !isProduction,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
