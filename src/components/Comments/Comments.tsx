import { useState, useEffect, useMemo } from "react";
import CommentCard from './CommentCard';
import type { Comment, CommentsVariant } from './types';
import { commentsData as defaultCommentsData } from './commentsData';

interface CommentsProps {
  variant: CommentsVariant;
  comments?: Comment[];
  commentsPerPage?: number;
  totalComments?: number;
  averageRating?: number;
}

function Comments({ variant, comments, commentsPerPage = 7, totalComments, averageRating }: CommentsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [aboutUsCurrentPage, setAboutUsCurrentPage] = useState(1);

  const defaultComments: Comment[] = comments || defaultCommentsData;

  const starDistribution = useMemo(() => {
    if (variant !== 'product' || !defaultComments.length) {
      return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    }
    
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    defaultComments.forEach(comment => {
      const stars = comment.starCount;
      if (stars >= 1 && stars <= 5) {
        distribution[stars as keyof typeof distribution]++;
      }
    });
    
    return distribution;
  }, [variant, defaultComments]);

  const starPercentages = useMemo(() => {
    const total = defaultComments.length || 1;
    return {
      5: (starDistribution[5] / total) * 100,
      4: (starDistribution[4] / total) * 100,
      3: (starDistribution[3] / total) * 100,
      2: (starDistribution[2] / total) * 100,
      1: (starDistribution[1] / total) * 100,
    };
  }, [starDistribution, defaultComments.length]);

  useEffect(() => {
    if (variant === 'homepage') {
      const handleNextClickEvent = () => {
        setSlideDirection('right');
        setTimeout(() => {
          setCurrentIndex(prev => {
            const newIndex = prev + 1;
            return newIndex >= defaultComments.length ? 0 : newIndex;
          });
          setSlideDirection(null);
        }, 900);
      };
      
      const handlePrevClickEvent = () => {
        setSlideDirection('left');
        setTimeout(() => {
          setCurrentIndex(prev => {
            const newIndex = prev - 1;
            return newIndex < 0 ? defaultComments.length - 1 : newIndex;
          });
          setSlideDirection(null);
        }, 900);
      };

      window.addEventListener('nextClick', handleNextClickEvent);
      window.addEventListener('prevClick', handlePrevClickEvent);

      return () => {
        window.removeEventListener('nextClick', handleNextClickEvent);
        window.removeEventListener('prevClick', handlePrevClickEvent);
      };
    }
  }, [variant, defaultComments.length]);

  if (variant === 'homepage') {
    const getCurrentCards = () => {
      const cards = [];
      for (let i = 0; i < 4; i++) {
        const index = (currentIndex + i) % defaultComments.length;
        cards.push(defaultComments[index]);
      }
      return cards;
    };
    
    const currentCards = getCurrentCards();

    return (
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-6 overflow-hidden">
        {currentCards.map((cmm, idx) => (
          <div
            className={
              idx === 2 ? "xl:block md:block hidden" :
              idx === 3 ? "xl:block md:hidden hidden" : "xl:block md:block block"
            }
            key={cmm.id}
          >
            <CommentCard 
              comment={cmm} 
              variant="homepage"
              slideDirection={slideDirection} 
              index={idx} 
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'product') {
    const totalPages = Math.ceil(defaultComments.length / commentsPerPage);
    const maxPagesToShow = 10;
    const displayPages = Math.min(totalPages, maxPagesToShow);
    
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const currentComments = defaultComments.slice(startIndex, endIndex);

    const finalAverageRating = averageRating ?? (defaultComments.length > 0 
      ? defaultComments.reduce((sum, c) => sum + c.starCount, 0) / defaultComments.length 
      : 0);
    const finalTotalComments = totalComments ?? defaultComments.length;

    const goToPage = (page: number) => {
      if (page >= 1 && page <= displayPages) {
        setCurrentPage(page);
      }
    };

    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const goToNextPage = () => {
      if (currentPage < displayPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
      <div className="max-w-7xl mx-auto">
        {/* Ortalama puan ve yıldız dağılımı */}
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col items-center text-center sm:justify-self-start mb-5 mx-5">
            <div className="font-bold mb-2">{finalAverageRating.toFixed(1)}</div>
            <div className="flex mb-2">
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
                    fill={i < Math.round(finalAverageRating) ? "#FDD835" : "#E0E0E0"}
                  />
                </svg>
              ))}
            </div>
            <div className="mb-2">{finalTotalComments} YORUM</div>
          </div>

          {/* Yıldız dağılımı */}
          <div className="space-y-2 mx-5">
            <div className="flex items-center gap-4">
              <div className="flex text-gray-600 text-sm w-16">
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
                      fill={i < 5 ? "#FDD835" : "#E0E0E0"}
                    />
                  </svg>
                ))}
              </div>
              <div className="flex-1 bg-gray-200 h-3 relative">
                <div
                  className="bg-gradient-to-r from-[#387EC7] to-[#1F23AA] h-3"
                  style={{ width: `${starPercentages[5]}%` }}
                />
              </div>
              <span className="text-gray-500 text-sm w-16 text-right">
                ({starDistribution[5]})
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-gray-600 text-sm w-16">
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
                      fill={i < 4 ? "#FDD835" : "#E0E0E0"}
                    />
                  </svg>
                ))}
              </div>
              <div className="flex-1 bg-gray-200 h-3 relative">
                <div
                  className="bg-gradient-to-r from-[#387EC7] to-[#1F23AA] h-3"
                  style={{ width: `${starPercentages[4]}%` }}
                />
              </div>
              <span className="text-gray-500 text-sm w-16 text-right">
                ({starDistribution[4]})
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-gray-600 text-sm w-16">
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
                      fill={i < 3 ? "#FDD835" : "#E0E0E0"}
                    />
                  </svg>
                ))}
              </div>
              <div className="flex-1 bg-gray-200 h-3 relative">
                <div
                  className="bg-gradient-to-r from-[#387EC7] to-[#1F23AA] h-3"
                  style={{ width: `${starPercentages[3]}%` }}
                />
              </div>
              <span className="text-gray-500 text-sm w-16 text-right">({starDistribution[3]})</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-gray-600 text-sm w-16">
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
                      fill={i < 2 ? "#FDD835" : "#E0E0E0"}
                    />
                  </svg>
                ))}
              </div>
              <div className="flex-1 bg-gray-200 h-3 relative">
                <div
                  className="bg-gradient-to-r from-[#387EC7] to-[#1F23AA] h-3"
                  style={{ width: `${starPercentages[2]}%` }}
                />
              </div>
              <span className="text-gray-500 text-sm w-16 text-right">({starDistribution[2]})</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex text-gray-600 text-sm w-16">
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
                      fill={i < 1 ? "#FDD835" : "#E0E0E0"}
                    />
                  </svg>
                ))}
              </div>
              <div className="flex-1 bg-gray-200 h-3 relative">
                <div
                  className="bg-gradient-to-r from-[#387EC7] to-[#1F23AA] h-3"
                  style={{ width: `${starPercentages[1]}%` }}
                />
              </div>
              <span className="text-gray-500 text-sm w-16 text-right">({starDistribution[1]})</span>
            </div>
          </div>
        </div>

        {/* Yorumlar listesi */}
        <div className="mt-12 mx-5">
          <div className="bg-gradient-to-r from-[#387EC7] to-[#1F23AA] rounded-[25px] h-[47px]
           w-[145px] text-white flex justify-center items-center font-bold">
                YORUM({finalTotalComments})
          </div>
          <div className="space-y-4">
            {currentComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} variant="product" />
            ))}
          </div>

          {/* Sayfalama */}
          <div className="flex items-center justify-center my-8 gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

          {Array.from({ length: displayPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-[#387EC7] text-white"
                  : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === displayPages}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              currentPage === displayPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
            }`}
          >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'aboutus') {
    const commentsPerPage = 10;
    const totalPages = Math.ceil(defaultComments.length / commentsPerPage);
    const maxPagesToShow = 10;
    const displayPages = Math.min(totalPages, maxPagesToShow);
    
    const startIndex = (aboutUsCurrentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const currentComments = defaultComments.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
      if (page >= 1 && page <= displayPages) {
        setAboutUsCurrentPage(page);
      }
    };

    const goToPreviousPage = () => {
      if (aboutUsCurrentPage > 1) {
        setAboutUsCurrentPage(aboutUsCurrentPage - 1);
      }
    };

    const goToNextPage = () => {
      if (aboutUsCurrentPage < displayPages) {
        setAboutUsCurrentPage(aboutUsCurrentPage + 1);
      }
    };
    
    return (
      <>
        <div className="space-y-3 sm:space-y-4 mt-5 px-2 sm:px-4 md:px-0">
          {currentComments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} variant="aboutus" />
          ))}
        </div>

        {displayPages > 1 && (
          <div className="flex items-center justify-center my-8 gap-2 px-2 sm:px-4 md:px-0">
            <button
              onClick={goToPreviousPage}
              disabled={aboutUsCurrentPage === 1}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                aboutUsCurrentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {Array.from({ length: displayPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  aboutUsCurrentPage === page
                    ? "bg-[#387EC7] text-white"
                    : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={aboutUsCurrentPage === displayPages}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                aboutUsCurrentPage === displayPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#387EC7] hover:bg-[#387EC7] hover:text-white"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </>
    );
  }

  return null;
}

export default Comments;
