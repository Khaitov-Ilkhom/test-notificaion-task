import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
          userToken: null,
          userId: null,

          setUserToken: (userToken: string) => set({userToken}),
          setUserId: (userId: number) => set({userId}),

          setAuthData: (authData: any) => set({userToken: authData.userToken, userId: authData.userId}),

          clearAuth: () => set({userToken: null, userId: null}),
        }),
        {
          name: "auth-store",
        },
    ),
);
