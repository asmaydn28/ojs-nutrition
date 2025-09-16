import { aromas } from "./aromaData";

interface AromaSelectorProps {
  selectedAroma: string;
  setSelectedAroma: (aroma: string) => void;
}

const AromaSelector = ({ selectedAroma, setSelectedAroma }: AromaSelectorProps) => {
  return (
    <div className="mt-6">
      <h3 className="font-inter font-bold text-black text-lg mb-4">AROMA:</h3>
      <div className="flex flex-wrap gap-2">
        {aromas.map((aroma) => (
          <button
            key={aroma.id}
            onClick={() => setSelectedAroma(aroma.name)}
            className={`
              relative flex items-center gap-2 px-3 py-2 border-2 rounded-md transition-all duration-200 w-fit
              ${
                selectedAroma === aroma.name
                  ? "border-[#2126AB] bg-orange-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }
            `}
            style={{ height: "35px" }}
          >
            {selectedAroma === aroma.name && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2126AB] rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <span className="font-inter text-xs text-black leading-tight">{aroma.name}</span>
            <div className="w-4 h-4 rounded-sm flex-shrink-0" style={{ backgroundColor: aroma.color }} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AromaSelector;
