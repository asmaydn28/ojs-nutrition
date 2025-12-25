import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useToastContext } from "@/components/Toast/useToastContext";

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthStore();
  const { showToast } = useToastContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Kullanıcı girişi - başarılı olursa token'ları kaydet ve hesap sayfasına yönlendir
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(email, password);
      
      // Response formatını kontrol et - API farklı formatlarda dönebilir
      const accessToken = response.data?.access_token || response.access_token;
      const refreshToken = response.data?.refresh_token || response.refresh_token;
      const userData = response.data?.user || response.user;
      
      if (!accessToken || !refreshToken) {
        throw new Error("Giriş başarılı ancak oturum bilgileri alınamadı. Lütfen tekrar deneyin.");
      }
      const userRecord = userData as Record<string, unknown>;
      const normalizedUser = userData ? {
        id: (userRecord.id as number) || (userRecord.userId as number) || 0,
        email: userData.email || email,
        first_name: userData.first_name || (userRecord.firstName as string) || "",
        last_name: userData.last_name || (userRecord.lastName as string) || "",
        phone_number: (userRecord.phone_number as string | undefined) || (userRecord.phoneNumber as string | undefined) || (userRecord.phone as string | undefined) || undefined,
      } : {
        id: 0,
        email: email,
        first_name: "",
        last_name: "",
        phone_number: undefined,
      };
      
      setAuth(accessToken, refreshToken, normalizedUser);
      showToast("Giriş başarılı! Hoş geldiniz.", "success");
      navigate("/hesabım");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* E-Posta Alanı */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-800"
          >
            *E-Posta
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded border border-gray-300 bg-gray-100 h-12 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm"
            />
          </div>
        </div>

        {/* Şifre Alanı */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-800"
          >
            *Şifre
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded border border-gray-300 bg-gray-100 h-12 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm"
            />
          </div>
          <div className="text-right mt-2">
            <a href="#" className="text-xs font-medium text-black underline">
              Şifremi Unuttum?
            </a>
          </div>
        </div>

        {/* Giriş Yap Butonu */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded bg-black h-14 items-center text-lg font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "GİRİŞ YAPILIYOR..." : "GİRİŞ YAP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;