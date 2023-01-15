import { useState, useMemo, useCallback } from "react";

import { useUserInfo } from "@hooks/Auth/useUserInfo";
import API from "@services/api";

interface IApiCallProps {
  body?: Record<string, any>;
  query?: Record<string, any>;
  overlapParams?: Record<string, any>;
}

interface IApiHookReturn {
  // @ts-ignore
  call: ({ body, query, overlapParams }?: IApiCallProps) => Promise<any>;
  isLoading: boolean;
}

interface IApiHookProps {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
}

const useAPI = ({ path, method = "GET" }: IApiHookProps): IApiHookReturn => {
  const [isLoading, setLoading] = useState<boolean>(false),
    { userInfo } = useUserInfo(),
    { scope } = userInfo;

  const getHeaders = () => ({
    Authorization: `Bearer ${userInfo?.access_token}`,
  });

  const call = useCallback(
    async ({ body, query, overlapParams }: IApiCallProps = {}) => {
      setLoading(true);

      try {
        const response = await API(path, {
          method,
          headers: getHeaders(),
          params: {
            scope,
            ...query,
            ...overlapParams,
          },
          ...(!!body && { data: body }),
        });

        return Promise.resolve(response);
      } catch (error) {
        return Promise.resolve(error);
      } finally {
        setLoading(false);
      }
    },
    [path, method, scope]
  );

  const memoizedMethods = useMemo(
    () => ({ call, isLoading }),
    [call, isLoading]
  );

  return memoizedMethods;
};

export default useAPI;
