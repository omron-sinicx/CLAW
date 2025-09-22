import React, { useState } from 'react';
import ZoomableImage from './zoomable-image.jsx';

export default function AdvancedTasks({ tasks }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!tasks || tasks.length === 0) return null;

  const currentTask = tasks[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tasks.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === tasks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="advanced-tasks-container">
      {/* Main image display */}
      <div className="uk-margin-medium">
        <ZoomableImage
          src={currentTask.image}
          alt={currentTask.alt}
          caption={currentTask.caption}
          className="uk-margin-bottom"
        />
      </div>

      {/* Navigation controls */}
      <div className="uk-flex uk-flex-center uk-margin-medium">
        <button
          className="uk-icon-button uk-margin-small-right"
          onClick={goToPrevious}
          aria-label="Previous image"
          style={{
            backgroundColor: '#1e87f0',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ‹
        </button>

        <div className="uk-flex uk-flex-middle uk-margin-small-left uk-margin-small-right">
          <span className="uk-text-small uk-text-muted">
            {currentIndex + 1} of {tasks.length}
          </span>
        </div>

        <button
          className="uk-icon-button uk-margin-small-left"
          onClick={goToNext}
          aria-label="Next image"
          style={{
            backgroundColor: '#1e87f0',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ›
        </button>
      </div>

      {/* Thumbnail navigation */}
      <div className="uk-flex uk-flex-center uk-margin-medium">
        <div className="uk-grid-small uk-child-width-auto" uk-grid>
          {tasks.map((task, index) => (
            <div key={index}>
              <button
                onClick={() => goToSlide(index)}
                className={`thumbnail-button ${index === currentIndex ? 'active' : ''}`}
                style={{
                  border:
                    index === currentIndex
                      ? '3px solid #1e87f0'
                      : '2px solid #e5e5e5',
                  borderRadius: '4px',
                  padding: '2px',
                  background: 'transparent',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                }}
                aria-label={`Go to ${task.alt}`}
              >
                <img
                  src={task.image}
                  alt={task.alt}
                  style={{
                    width: '60px',
                    height: '45px',
                    objectFit: 'cover',
                    borderRadius: '2px',
                    opacity: index === currentIndex ? 1 : 0.7,
                    transition: 'opacity 0.2s ease',
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation instructions */}
      <div className="uk-text-center uk-margin-small">
        <span className="uk-text-small uk-text-muted">
          Click images to zoom • Use arrow buttons, thumbnails, or keyboard
          arrow keys to navigate
        </span>
      </div>
    </div>
  );
}
