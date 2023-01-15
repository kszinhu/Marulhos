import { useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

export interface IUserInfoData {
  name: string;
  email: string;
  access_token: string;
  isLogged: boolean;
  imageUrl: string;
  expiresAt: Date;
  scope: "admin" | "user" | "guest";
}

interface IUseUserInfoReturn {
  userInfo: IUserInfoData | Record<string, never>;
  setUserInfo: (
    val:
      | IUserInfoData
      | Record<string, never>
      | ((
          prevState: IUserInfoData | Record<string, never>
        ) => IUserInfoData | Record<string, never>)
  ) => void;
  isLogged: boolean;
}

export const useUserInfo = (): IUseUserInfoReturn => {
  const [userInfo, setUserInfo] = useLocalStorage<
    IUseUserInfoReturn["userInfo"]
  >({ key: "userInfo", defaultValue: {}, getInitialValueInEffect: false });

  return {
    userInfo,
    setUserInfo,
    isLogged: Object.entries(userInfo).length > 0,
  };
};
