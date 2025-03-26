"use client";

import { useContent } from '@/context/ContentContext';
import { AboutData } from '@/types/content';

export default function AboutHero({ aboutData }: { aboutData: AboutData }) {
  const { currentLanguage } = useContent();
  
  // Get the content for the current language
  const content = aboutData.languages?.[currentLanguage];

  if (!content) {
    return null;
  }

  return (
    <section className="w-full bg-background py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Title with subtle accent */}
        <div className="mb-12 border-l-4 border-accent pl-6 py-2">
          <h1 className="text-3xl md:text-4xl font-bold text-textPrimary">
            {content.title}
          </h1>
        </div>
        
        {/* Paragraphs with improved styling */}
        <div className="space-y-8">
          {content.paragraphs.map((paragraph: string, index: number) => (
            <div key={index} className="bg-surface p-6 rounded-lg border-l border-border">
              <p className="text-base md:text-lg leading-relaxed text-textPrimary">
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
