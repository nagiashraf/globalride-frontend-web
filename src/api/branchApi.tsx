import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "./api";
import { LOCALES } from "@/i18n/constants";
import i18n from "@/i18n/i18n";

export type BranchSearchResult = {
  id: string;
  languageCode: "en" | "fr" | "es" | "ar";
  name: string;
  city: string;
  country: string;
  type: "Airport" | "Downtown";
  timeZone: string;
};

export const useSearchBranches = (searchTerm: string, resultsCount = 5) => {
  const currentLocale = LOCALES.find(
    (locale) => locale.code === i18n.resolvedLanguage,
  );
  const languageCode = currentLocale?.code || "en";

  const request = async (
    searchTerm: string,
    resultsCount = 5,
  ): Promise<BranchSearchResult[]> => {
    const params = new URLSearchParams({
      searchTerm,
      resultsCount: resultsCount.toString(),
      languageCode,
    });

    return await api.get("api/branches", { params });
  };

  return useQuery({
    queryKey: ["fetchBranches", searchTerm, resultsCount, languageCode],
    queryFn: () => request(searchTerm, resultsCount),
    enabled: !!searchTerm,
    placeholderData: keepPreviousData,
  });
};
