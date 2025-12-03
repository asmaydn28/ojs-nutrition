function SearchInput() {
  return (
    <div className="hidden md:block">
      <form className="flex max-w-md rounded-[4px] ml-3 border border-gray-400 bg-white">
        <input
          type="text"
          placeholder="Aradığınız ürünü yazınız"
          className="w-full px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#919191] px-6 text-white hover:bg-gray-400 transition"
        >
          ARA
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
