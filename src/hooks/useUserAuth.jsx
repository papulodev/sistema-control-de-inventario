import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('UserAuth must be used within an AuthContextProvider');
  }
  return context;
}