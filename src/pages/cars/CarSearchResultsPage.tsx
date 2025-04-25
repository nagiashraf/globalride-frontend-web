import { useSearchAvailableCarsByBranch } from "@/api/carApi";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";

const CarSearchResultsPage = () => {
  const [search] = useSearchParams();

  const { data, isPending, error } = useSearchAvailableCarsByBranch({
    pickupBranchId: search.get("pickupBranch") || "",
    dropoffBranchId:
      search.get("dropoffBranch") || search.get("pickupBranch") || "",
    pickupDateTime: dayjs(search.get("pickupDate")),
    dropoffDateTime: dayjs(search.get("dropoffDate")),
  });

  const getErrors = (error: AxiosError) => {
    if (error.response?.status === 400) {
      const responseData = error.response.data as any;
      if (responseData.errors) {
        const modelStateErrors = [];
        for (let key in responseData.errors) {
          if (responseData.errors[key]) {
            modelStateErrors.push(responseData.errors[key]);
          }
        }
        return modelStateErrors.flat();
      }
    }

    return [];
  };

  return (
    <div className="container min-h-screen p-section">
      <h1 className="mb-8">Search Results</h1>
      <h3>{data && data.length > 0 && JSON.stringify(data, null, "\t")}</h3>
      <h3>{data && data.length === 0 && "No cars found"}</h3>
      <h3>{isPending && "Loading..."}</h3>
      {error &&
        getErrors(error).map((err) => (
          <h3 key={err} className="text-danger-500">
            {err}
          </h3>
        ))}
    </div>
  );
};

export default CarSearchResultsPage;
