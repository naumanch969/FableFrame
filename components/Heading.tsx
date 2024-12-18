import React from 'react';

interface HeadingProps {
  title: string;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xl'; // Size options, adjusted to your theme
  color?: 'primary' | 'secondary' | 'neutral' | string; // Color options, can accept custom colors
}

const Heading: React.FC<HeadingProps> = ({ title, className = '', size = 'medium', color = 'primary' }) => {
  // Size classes adjusted to align with your theme
  const sizeClasses = {
    small: 'text-lg',  // Small size
    medium: 'text-xl', // Medium size
    large: 'text-3xl', // Large size
    xl: 'text-5xl',    // Extra-large size (aligns with 5xl in your theme)
  };

  // Color classes, using Tailwind's color utilities
  const colorClasses: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    neutral: 'text-neutral',
  };

  // Check if the passed color is one of the predefined options, otherwise treat it as a custom color
  const textColor = colorClasses[color] || `text-${color}`;

  return (
    <h2 className={`font-extrabold text-center mb-2 ${sizeClasses[size]} ${textColor} ${className}`}>
      {title}
    </h2>
  );
};

export default Heading;
