import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useToastContext } from "@/components/Toast/useToastContext";

const Register = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuthStore();
  const { showToast } = useToastContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Kullanıcı kaydı - başarılı olursa otomatik giriş yap veya giriş sayfasına yönlendir
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await register({
        email,
        password,
        password2: password,
        first_name: firstName,
        last_name: lastName,
      });
      
      const accessToken = response.data?.access_token || response.access_token;
      const refreshToken = response.data?.refresh_token || response.refresh_token;
      const userData = response.data?.user || response.user;
      
      // Token yoksa kullanıcıyı giriş sayfasına yönlendir (kayıt başarılı ama otomatik giriş yapılamadı)
      if (!accessToken || !refreshToken) {
        showToast("Kayıt başarılı! Lütfen giriş yapın.", "success");
        navigate("/giris-yap");
        return;
      }
      
      const userRecord = userData as Record<string, unknown>;
      const normalizedUser = userData ? {
        id: (userRecord.id as number) || (userRecord.userId as number) || 0,
        email: userData.email || email,
        first_name: userData.first_name || (userRecord.firstName as string) || firstName,
        last_name: userData.last_name || (userRecord.lastName as string) || lastName,
        phone_number: (userRecord.phone_number as string | undefined) || (userRecord.phoneNumber as string | undefined) || (userRecord.phone as string | undefined) || undefined,
      } : {
        id: 0,
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: undefined,
      };
      
      setAuth(accessToken, refreshToken, normalizedUser);
      showToast("Kayıt başarılı! Hoş geldiniz.", "success");
      navigate("/hesabım");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.");
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

        {/* Ad ve Soyad Alanı */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-800"
            >
              *Ad
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded border border-gray-300 bg-gray-100 h-12 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-800"
            >
              *Soyad
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded border border-gray-300 bg-gray-100 h-12 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm"
              />
            </div>
          </div>
        </div>

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded border border-gray-300 bg-gray-100 h-12 px-3 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm"
            />
          </div>
        </div>

        {/* Üye Ol Butonu */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded bg-black h-14 items-center text-lg font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "KAYIT YAPILIYOR..." : "ÜYE OL"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
