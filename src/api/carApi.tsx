import { Dayjs } from "dayjs";
import api from "./api";
import { useQuery } from "@tanstack/react-query";
import { LOCALES } from "@/i18n/constants";
import i18n from "@/i18n/i18n";

type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  seatsCount: number;
  priceForPeriod: number;
  transmissionType: "automatic" | "manual";
  fuelType: "gasoline" | "diesel" | "electric";
};

type SearchAvailableCarsByBranchRequest = {
  pickupBranchId: string;
  dropoffBranchId?: string;
  pickupDateTime: Dayjs;
  dropoffDateTime: Dayjs;
};

export const useSearchAvailableCarsByBranch = (
  formData: SearchAvailableCarsByBranchRequest,
) => {
  const currentLocale = LOCALES.find(
    (locale) => locale.code === i18n.resolvedLanguage,
  );
  const languageCode = currentLocale?.code || "en";

  const request = async (): Promise<Car[]> => {
    const params = new URLSearchParams({
      pickupBranchId: formData.pickupBranchId,
      pickupDateTime: formData.pickupDateTime.toISOString(),
      dropoffDateTime: formData.dropoffDateTime.toISOString(),
    });

    if (formData.dropoffBranchId) {
      params.set("dropoffBranchId", formData.dropoffBranchId);
    }

    return await api.get("api/cars", { params });
  };

  return useQuery({
    queryKey: [
      "fetchAvailableCarsByBranch",
      formData.pickupBranchId,
      formData.dropoffBranchId,
      formData.pickupDateTime,
      formData.dropoffDateTime,
      languageCode,
    ],
    queryFn: request,
  });
};
