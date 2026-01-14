import { Link } from 'react-router-dom';
import type { Category } from '@/api/categories';
import { getCategoryImageUrl } from '@/api/categories';

interface CategoryDropdownProps {
  category: Category;
}

function CategoryDropdown({ category }: CategoryDropdownProps) {
  const { name, children, top_sellers } = category;

  // Children'ları order'a göre sırala
  const sortedChildren = [...children].sort((a, b) => a.order - b.order);

  // Grid sütun sayısını children sayısına göre belirle
  const getGridCols = () => {
    const count = sortedChildren.length;
    if (count <= 2) return 'lg:grid-cols-2';
    if (count <= 3) return 'lg:grid-cols-3';
    return 'lg:grid-cols-4';
  };

  return (
    <div className="relative group">
      <button className="px-4 py-2">{name}</button>
      <div className="fixed left-1/2 top-[129px] transform -translate-x-1/2
        w-[99vw] sm:w-[95vw] md:w-[90vw] lg:w-[1200px]
        max-w-[99vw] sm:max-w-[95vw] md:max-w-[900px] lg:max-w-[1200px]
        min-w-0 bg-white shadow-2xl hidden group-hover:flex hover:flex z-50 text-black rounded-2xl flex-col md:flex-row p-2 md:p-6 transition-all duration-200 overflow-x-auto border border-gray-200 font-sans">
        
        {/* Sol: En Çok Satanlar */}
        {top_sellers && top_sellers.length > 0 && (
          <div className="flex flex-col p-2 md:p-4 md:w-[260px] rounded-xl bg-gray-100 min-w-0 border border-gray-200 shadow-sm">
            <h3 className="font-extrabold mb-2 md:mb-4 text-xs md:text-base text-gray-900 tracking-tight font-sans">
              ÇOK SATANLAR
            </h3>
            <ul className="flex flex-col gap-2">
              {top_sellers.map((product, index) => (
                <li key={index}>
                  <Link 
                    to={`/product/${product.slug}`}
                    className="flex items-center gap-2 md:gap-3 cursor-pointer flex-none min-w-0 hover:bg-gray-200 rounded-lg p-1 transition-colors"
                  >
                    <img
                      src={getCategoryImageUrl(product.picture_src)}
                      alt={product.name}
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain rounded flex-shrink-0 border border-gray-200 bg-white"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-xs md:text-sm truncate text-gray-800 font-sans">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate font-sans">
                        {product.description}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sağ: Alt Kategoriler */}
        <div className="flex-1 min-w-0 flex flex-col p-2 md:p-4">
          <h2 className="font-extrabold text-base md:text-xl mb-2 md:mb-6 ml-2 text-gray-900 tracking-tight font-sans">
            {name}
          </h2>
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${getGridCols()} gap-x-8 gap-y-6 min-w-0`}>
            {sortedChildren.map((child) => {
              // Sub_children'ları order'a göre sırala
              const sortedSubChildren = [...(child.sub_children || [])].sort((a, b) => a.order - b.order);
              
              return (
                <div key={child.id} className="min-w-0">
                  <h3 className="font-bold mb-1 md:mb-2 text-xs md:text-sm text-gray-800 font-sans opacity-90">
                    {child.name}
                  </h3>
                  <ul className="space-y-1">
                    {sortedSubChildren.map((subChild, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={`/product/${subChild.slug}`}
                          className="cursor-pointer text-xs md:text-sm truncate text-gray-500 hover:text-black transition-colors duration-150 font-sans block"
                        >
                          {subChild.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryDropdown;
