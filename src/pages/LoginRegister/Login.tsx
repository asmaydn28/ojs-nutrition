const Login = () => {
  return (
    <div className="w-full">
      <form className="space-y-6">
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
            className="flex w-full justify-center rounded bg-black h-14 items-center text-lg font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            GİRİŞ YAP
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;