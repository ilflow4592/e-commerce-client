"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

export interface User {
  id: number;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AuthContext = createContext<{
  user: User | null;
  isLogin: boolean | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>;
  handleLogout: () => void;
}>({
  user: null,
  isLogin: null,
  setUser: () => {},
  setIsLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const pathname = usePathname();
  const isFetched = useRef(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setIsLogin(false);
      setUser(null);

      if (pathname === "/shop") {
        router.push("/shop/login");
      } else {
        router.push("/admin/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFetched.current) return; // 이미 실행되었다면 다시 실행하지 않음
    isFetched.current = true; // 처음 실행됨을 기록

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/me",
          { withCredentials: true }
        );
        if (response.data) {
          setUser(response.data);
          setIsLogin(true);
        } else {
          if (pathname !== "/shop") {
            setIsLogin(false);
            router.push("/admin/login");
          }
        }
      } catch (error) {
        setIsLogin(false);
        router.push("/admin/login");

        console.log(error);
      }
    };
    fetchData();
  }, [pathname, router]);

  useEffect(() => {
    if (isLogin === null) return;
    console.log(pathname);

    if (pathname === "/shop" || pathname === "/shop/login") return;

    if (!isLogin && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
    if (isLogin && pathname === "/admin/login") {
      router.push("/admin");
    }
  }, [isLogin, pathname, router]);

  return (
    <AuthContext.Provider
      value={{ user, isLogin, setUser, setIsLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
