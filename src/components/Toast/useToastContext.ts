import { useContext } from "react";
import { ToastContext } from "./ToastContext";

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext, ToastProvider içinde kullanılmalıdır");
  }
  return context;
}

