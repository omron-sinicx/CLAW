import React, { useState } from 'react';

export default function ZoomableImage({ src, alt, caption, className = '' }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const openZoom = () => {
    setIsZoomed(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeZoom = () => {
    setIsZoomed(false);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e) => {
    // Close modal only if clicking on the backdrop, not the image
    if (e.target === e.currentTarget) {
      closeZoom();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeZoom();
    }
  };

  // Add/remove event listener for ESC key
  React.useEffect(() => {
    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isZoomed]);

  return (
    <>
      {/* Regular image */}
      <div className={`uk-text-center ${className}`}>
        <img
          src={src}
          alt={alt}
          className="uk-align-center uk-responsive-width zoomable-image"
          onClick={openZoom}
          style={{
            cursor: 'zoom-in',
            maxWidth: '80%',
            height: 'auto',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
        {caption && (
          <div className="uk-text-meta uk-text-center uk-margin-small-top">
            {caption}
          </div>
        )}
      </div>

      {/* Zoom overlay/modal */}
      {isZoomed && (
        <div
          className="zoom-overlay"
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
          }}
        >
          <div
            style={{ position: 'relative', maxWidth: '95%', maxHeight: '95%' }}
          >
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                cursor: 'zoom-out',
              }}
              onClick={closeZoom}
            />
            {/* Close button */}
            <button
              onClick={closeZoom}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close zoom"
            >
              ×
            </button>
            {caption && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  textAlign: 'center',
                  maxWidth: '80%',
                }}
              >
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
