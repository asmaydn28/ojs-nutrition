import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, isVisible, onClose, duration = 2500 }: ToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  const config = {
    success: {
      bg: "bg-gradient-to-r from-emerald-500 to-green-600",
      border: "border-emerald-400/30",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bg: "bg-gradient-to-r from-red-500 to-rose-600",
      border: "border-red-400/30",
      icon: <XCircle className="w-5 h-5" />,
    },
    info: {
      bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
      border: "border-blue-400/30",
      icon: <Info className="w-5 h-5" />,
    },
  }[type];

  return (
    <div 
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-out
        ${isAnimating && isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <div 
        className={`${config.bg} ${config.border} border text-white px-5 py-3 rounded-xl 
          shadow-2xl backdrop-blur-sm flex items-center gap-3 min-w-[280px] max-w-[90vw] md:max-w-md`}
      >
        <div className="flex-shrink-0 opacity-90">
          {config.icon}
        </div>
        <p className="flex-1 text-sm font-medium leading-tight">{message}</p>
        <button
          onClick={() => {
            setIsAnimating(false);
            setTimeout(onClose, 300);
          }}
          className="flex-shrink-0 text-white/80 hover:text-white transition-colors p-1 -mr-1 rounded-full hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}