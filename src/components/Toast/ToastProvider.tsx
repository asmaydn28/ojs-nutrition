import type { ReactNode } from "react";
import { useToast } from "@/hooks/useToast";
import { Toast } from "./Toast";
import { ToastContext } from "./ToastContext";

// Toast bildirim sistemi için provider component
function ToastProvider({ children }: { children: ReactNode }) {
  const { toast, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

export default ToastProvider;

