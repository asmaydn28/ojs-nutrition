import { sizes } from "./sizeData";

interface SizeSelectorProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

const SizeSelector = ({ selectedSize, setSelectedSize }: SizeSelectorProps) => {
  return (
    <div className="mt-6">
      <h3 className="font-inter font-bold text-black text-lg mb-4">BOYUT:</h3>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => setSelectedSize(size.id)}
            className={`
              relative border-2 rounded-md transition-all duration-200 px-6 py-4 text-center min-w-[140px]
              ${
                selectedSize === size.id
                  ? "border-[#2126AB] bg-white"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }
              ${size.discount ? 'min-w-[180px]' : ''}
            `}
          >
            {size.discount && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {size.discount}
              </div>
            )}

            {selectedSize === size.id && (
              <div className={`absolute -top-1 ${size.discount ? '-left-1' : '-right-1'} w-4 h-4 bg-[#2126AB] rounded-full flex items-center justify-center`}>
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            <div className="font-inter font-bold text-black text-lg">{size.name}</div>
            <div className="font-inter text-sm text-black">{size.serving}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;