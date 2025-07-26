import { useQuery } from "@tanstack/react-query";
import useApi from "./use-api";

const useGetQuery = ({ url, params, config, queryProps }: {url: string, params?: string, config?: any, queryProps?: any}) => {
  const { request } = useApi();

  const { ...rest } = useQuery({
    queryFn: () => request.get(url, { params, ...config }),
    ...queryProps,
  });

  return { ...rest };
};

export default useGetQuery;
