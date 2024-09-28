import React, { useEffect } from 'react';
import './StarBackground.css'; // Import the CSS file

const StarBackground = () => {
  // Function to create stars
  const createStars = (type, quantity, animated = true) => {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container'; // Optional container for better control
    document.body.appendChild(starsContainer);

    for (let i = 0; i < quantity; i++) {
      const star = document.createElement('div');
      star.classList.add('star', `type-${type}`);
      star.style.left = `${randomNumber(1, 100)}%`;
      star.style.bottom = `${randomNumber(1, 100)}%`;

      if (animated) {
        star.style.animationDuration = `${randomNumber(50, 400)}s`;
      } else {
        star.classList.add('static-star');
      }

      starsContainer.appendChild(star);
    }
  };

  // Function to generate a random number between min and max
  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    // Create stars when the component mounts
    createStars(1, 100, false);
    createStars(1, 100);
    createStars(2, 85);
    createStars(3, 70);

    // Clean up stars when component unmounts
    return () => {
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        starsContainer.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything directly
};

export default StarBackground;
