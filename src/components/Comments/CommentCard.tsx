import type { Comment } from './types';

interface CommentCardProps {
  comment: Comment;
  variant?: 'homepage' | 'product' | 'aboutus';
  slideDirection?: 'left' | 'right' | null;
  index?: number;
}

const CommentCard = ({ 
  comment, 
  variant = 'homepage',
  slideDirection = null,
  index = 0 
}: CommentCardProps) => {
  // Homepage variant - carousel için----------------------------------------------
  if (variant === 'homepage') {
    return (
      <div
        key={`${comment.id}-${index}`}
        className={`p-6 bg-white ${
          slideDirection === 'right' ? 'animate-slideLeftStaggered' :
          slideDirection === 'left' ? 'animate-slideRightStaggered' : ''
        }`}
        style={{
          animationDelay: `${index * 50}ms`,
          animationDuration: '900ms'
        }}
      >
        <div className="flex items-center mb-3 w-full">
          <div className="flex flex-1 xl:hidden">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="w-4 h-4 md:w-5 md:h-5 mr-1"
                >
                  <path
                    d="M14 2L17.09 9.26L25 10.27L18.5 15.97L20.18 23.72L14 19.77L7.82 23.72L9.5 15.97L3 10.27L10.91 9.26L14 2Z"
                    fill={i < comment.starCount ? "#FDD835" : "#E0E0E0"}
                  />
                </svg>
              ))}
            </div>
          </div>
          <div className="text-gray-500 font-medium ml-auto xl:ml-0 xl:text-left text-xs md:text-sm">
            {comment.date}
          </div>
        </div>
        <div className="font-bold text-base md:text-lg mb-3 text-gray-800">
          {comment.title}
        </div>
        <div className="text-gray-700 text-xs md:text-sm leading-relaxed">
          {comment.content}
        </div>
      </div>
    );
  }

  // Product variant - pagination için-------------------------------------------------
  if (variant === 'product') {
    return (
      <div className="bg-[#F7F7F7] my-3 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z"
                  fill={i < comment.starCount ? "#FDD835" : "#E0E0E0"}
                />
              </svg>
            ))}
          </div>
          <div className="font-semibold text-gray-800">{comment.name}</div>
          <div className="ml-auto text-gray-500 text-sm">{comment.date}</div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2 text-gray-900">{comment.title}</div>
          <div className="text-gray-700 leading-relaxed">{comment.content}</div>
        </div>
      </div>
    );
  }

  // AboutUs variant - Figma tasarımına göre (Responsive)--------------------------------------
  if (variant === 'aboutus') {
    return (
      <div className="bg-[#F7F7F7] rounded-[20px] md:rounded-[30px] p-4 md:p-[25px] w-full max-w-[1160px] mx-auto">
        {/* Üst kısım: Yıldızlar ve Kullanıcı bilgileri - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
          {/* Sol: Yıldızlar */}
          <div className="flex items-center gap-1 sm:gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-[30px] md:h-[30px]"
              >
                <path
                  d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21L12 17.77L5.82 21L7 14.14L2 9L8.91 8.26L12 2Z"
                  fill={i < comment.starCount ? "#F5D63D" : "#E0E0E0"}
                />
              </svg>
            ))}
          </div>

          {/* Orta: Kullanıcı adı ve Badge - Sola yaslanmış */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 sm:justify-start">
            <span className="font-inter font-bold text-base sm:text-lg md:text-[19.53px] leading-[1.024em] text-[#000000]">
              {comment.name}
            </span>
            {comment.isVerified && (
              <div className="bg-[#BBDCC7] rounded-[15px] sm:rounded-[20px] px-2 sm:px-[10px] py-1 sm:py-0 h-[22px] sm:h-[25px] flex items-center w-fit">
                <span className="font-inter font-normal text-[7px] sm:text-[8.75px] leading-[2.86em] uppercase text-[#008000] whitespace-nowrap">
                  Doğrulanmış Müşteri
                </span>
              </div>
            )}
          </div>

          {/* Sağ: Tarih - Mobilde alt satıra geçer */}
          <div className="font-inter font-bold text-sm sm:text-base leading-[1.06em] uppercase text-[#333333] sm:ml-auto">
            {comment.date}
          </div>
        </div>

        {/* Ürün adı - Responsive */}
        <div className="mb-3">
          <h3 className="font-inter font-bold text-lg sm:text-xl md:text-[21.94px] leading-[1.41em] text-[#111111] break-words">
            {comment.productName || comment.title}
          </h3>
        </div>

        {/* Yorum içeriği - Responsive */}
        <div className="mb-4">
          <p className="font-inter font-normal text-sm sm:text-base md:text-[15.36px] leading-[1.54em] text-[#333333] break-words">
            {comment.content}
          </p>
        </div>

        {/* Ürün linki - Responsive */}
        {comment.productLink && comment.productName && (
          <div>
            <a 
              href={comment.productLink} 
              className="font-inter font-normal text-[7px] sm:text-[8px] md:text-[8.91px] leading-[1.91em] uppercase text-[#333333] hover:underline break-words"
            >
              Hakkında {comment.productName.toUpperCase()}
            </a>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default CommentCard;
