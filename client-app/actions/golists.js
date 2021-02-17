import useSWR from "swr";

const GOLIST_API_ROOT = "https://api.goli.st";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const options = { errorRetryCount: 10 };

export function useGoList(name) {
  const { data, error } = useSWR(
    `${GOLIST_API_ROOT}/golists/${name}`,
    fetcher,
    options
  );
  return {
    data,
    error,
    isLoading: !error && !data,
  };
}
