import React from 'react';

type CommentCardProps = {
  comment: any;
  slideDirection: 'left' | 'right' | null;
  index: number;
};

const CommentCard = ({ comment, slideDirection, index }: CommentCardProps) => {
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
                  fill="#FDD835"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="text-gray-500 font-medium ml-auto xl:ml-0 xl:text-left text-xs md:text-sm">{comment.date}</div>
      </div>
      <div className="font-bold text-base md:text-lg mb-3 text-gray-800">{comment.title}</div>
      <div className="text-gray-700 text-xs md:text-sm leading-relaxed">{comment.comment}</div>
    </div>
  );
};

export default CommentCard;