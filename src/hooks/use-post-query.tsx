import {useMutation, useQueryClient} from "@tanstack/react-query";
import useApi from "./use-api";

const usePostQuery = ({queryKey}: { queryKey: string[] }) => {
  const {request} = useApi();
  const queryClient = useQueryClient();

  const mutationFn = (url: string, attributes: any, config = {}) =>
      request.post(url, attributes, config);

  const {...rest} = useMutation({
    mutationFn: ({url, attributes, config = {}}: { url: string, attributes: any, config?: any }) =>
        mutationFn(url, attributes, config),

    onError: (error) => {
      console.log(error);
    },

    onSuccess: () => {
      if (queryKey) {
        queryClient.invalidateQueries({queryKey}).then(() => {
        });
      }
    },
  });

  return {...rest};
};

export default usePostQuery;
