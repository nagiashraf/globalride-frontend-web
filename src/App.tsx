import { Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/home/HomePage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CarSearchResultsPage from "./pages/cars/CarSearchResultsPage";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      document.documentElement.lang = lng;
      document.documentElement.dir = i18n.dir();
    };

    handleLanguageChange(i18n.language);

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="car-search-results" element={<CarSearchResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
