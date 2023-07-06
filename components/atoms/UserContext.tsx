import React, { createContext, useContext, useEffect, useState } from "react";
import { CurrentUsrType, UsrType } from "../../components/custom-types/UserTypes";
import { useRouter, useSegments } from "expo-router";

type UserContextType = {
  currUsr: CurrentUsrType | null;
  setCurrUsr: React.Dispatch<React.SetStateAction<CurrentUsrType | null>>;
}

export const UserContext = createContext<UserContextType>({
  currUsr: null,
  setCurrUsr: () => { },
});

const AuthContext = createContext<UserContextType>({
  currUsr: null,
  setCurrUsr: () => { },
});

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(usr: CurrentUsrType | null) {
  const segements = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segements[0] === "auth";

    if (!usr && !inAuthGroup) {
      router.replace("/auth/");

    } else if (usr && inAuthGroup) {
      switch (usr.type) {
        case UsrType.teacher: {
          router.replace('/teacher/');
          break;
        }
        case UsrType.student: {
          router.replace('/student/');
          break;
        }
      }
    }
  }, [usr, segements]);
}

type Children = {
  children: JSX.Element
}

export function Provider({ children }: Children) {
  const [currUsr, setAuth] = useState<CurrentUsrType | null>(null);
  const value: UserContextType = {
    currUsr: currUsr,
    setCurrUsr: setAuth,
  };

  useProtectedRoute(currUsr);

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}
