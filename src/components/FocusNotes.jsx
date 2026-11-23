import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Zap, Target, TrendingUp, Sparkles } from 'lucide-react';
import { focusNotes } from '../data/focusNotesData';

/**
 * FocusNotes - Accessible 3-slide productivity carousel with circular navigation,
 * keyboard controls, active indicator styling, and auto-rotation with hover pause.
 */
export default function FocusNotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = focusNotes.length;

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  // Gentle auto-advance (every 7 seconds), pauses on user hover or focus
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      goToNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, goToNext]);

  const currentSlide = focusNotes[currentIndex];

  const getSlideIcon = (id) => {
    switch (id) {
      case 1:
        return <Zap size={22} className="focus-notes__slide-icon" />;
      case 2:
        return <Target size={22} className="focus-notes__slide-icon" />;
      case 3:
      default:
        return <TrendingUp size={22} className="focus-notes__slide-icon" />;
    }
  };

  return (
    <section
      className="focus-notes"
      aria-roledescription="carousel"
      aria-label="Focus Notes and Productivity Highlights"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
    >
      <div className="focus-notes__header">
        <div className="focus-notes__title-group">
          <div className="focus-notes__badge">
            <Sparkles size={14} />
            <span>Daily Focus Briefing</span>
          </div>
          <span className="focus-notes__counter" aria-live="polite">
            Slide {currentIndex + 1} of {totalSlides}
          </span>
        </div>

        {/* Carousel Prev / Next Buttons */}
        <div className="focus-notes__controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={goToPrev}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="carousel-btn"
            onClick={goToNext}
            aria-label="Next focus note"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Active Slide Content */}
      <div
        className="focus-notes__content-box"
        role="group"
        aria-roledescription="slide"
        aria-label={`${currentIndex + 1} of ${totalSlides}: ${currentSlide.heading}`}
      >
        <div className="focus-notes__meta">
          <span className="focus-notes__number">{currentSlide.slideNumber}</span>
          <span className="focus-notes__tag">{currentSlide.tag}</span>
        </div>

        <div className="focus-notes__body">
          <div className="focus-notes__icon-container">
            {getSlideIcon(currentSlide.id)}
          </div>
          <div className="focus-notes__text">
            <h3 className="focus-notes__heading">{currentSlide.heading}</h3>
            <p className="focus-notes__description">{currentSlide.description}</p>
            {currentSlide.tip && (
              <div className="focus-notes__tip">
                <strong>Pro-tip:</strong> {currentSlide.tip}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="focus-notes__indicators" role="tablist" aria-label="Slide indicators">
        {focusNotes.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${index + 1}: ${slide.heading}`}
              className={`indicator-dot ${isActive ? 'indicator-dot--active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          );
        })}
      </div>
    </section>
  );
}
