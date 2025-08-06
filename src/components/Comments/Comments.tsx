import { comment } from "./Comment";
import { useState, useEffect } from "react";
import CommentCard from './CommentCard';
import "./styleComment.css";

function Comments() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  // Carousel mantığı - her zaman 4 card göster (CSS ile gizlenecek)
  const getCurrentCards = () => {
    const cards = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % comment.length;
      cards.push(comment[index]);
    }
    return cards;
  };
  
  const currentCards = getCurrentCards();

  // Sol ok tıklama - geri git (kartlar sola kaymalı, yeni kart soldan gelmeli)
  const handlePrevClick = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentIndex(prev => {
        const newIndex = prev - 1;
        return newIndex < 0 ? comment.length - 1 : newIndex;
      });
      setSlideDirection(null);
    }, 900);
  };

  // Sağ ok tıklama - ileri git (kartlar sağa kaymalı, yeni kart sağdan gelmeli)
  const handleNextClick = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentIndex(prev => {
        const newIndex = prev + 1;
        return newIndex >= comment.length ? 0 : newIndex;
      });
      setSlideDirection(null);
    }, 900);
  };

  // Event listener'ları ekle
  useEffect(() => {
    const handleNextClickEvent = () => handleNextClick();
    const handlePrevClickEvent = () => handlePrevClick();

    window.addEventListener('nextClick', handleNextClickEvent);
    window.addEventListener('prevClick', handlePrevClickEvent);

    return () => {
      window.removeEventListener('nextClick', handleNextClickEvent);
      window.removeEventListener('prevClick', handlePrevClickEvent);
    };
  }, []);

  return (
    <>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6 mt-6 overflow-hidden">
        {currentCards.map((cmm, idx) => (
          <div
            className={
              idx === 2 ? "xl:block md:block hidden" :
              idx === 3 ? "xl:block md:hidden hidden" : "xl:block md:block block"
            }
            key={cmm.id}
          >
            <CommentCard comment={cmm} slideDirection={slideDirection} index={idx} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Comments;
