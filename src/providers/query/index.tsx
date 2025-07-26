import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const Index = ({children}: { children: any }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
        retry: 2,
        retryOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
  );
};

export default Index;
