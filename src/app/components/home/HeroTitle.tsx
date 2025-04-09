'use client'
import React from 'react'

const HeroTitle: React.FC<{ title: string | undefined; subtitle?: string }> = ({ title = 'Plan Your Trip Instantly', subtitle }) => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-5">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        {title}
      </h1>
      {
        subtitle &&
        <p className="text-lg sm:text-xl  mt-4 max-w-2xl mx-auto my-2">
          {subtitle}
        </p>
      }
    </div>
  );
};

export default HeroTitle;
