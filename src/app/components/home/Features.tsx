"use client";

import { useContent } from '@/context/ContentContext';
import { Clock, Map, Monitor, Globe } from 'lucide-react'; // Import icons we'll use

const FeatureCard = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-start space-x-6 p-8 bg-surface rounded-2xl border border-border 
    hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
    <div className="p-3 bg-primary/10 rounded-xl text-accent group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-textPrimary text-lg leading-relaxed">{text}</p>
  </div>
);

const Features = () => {
  const { content } = useContent();

  if (!content) return null;

  // Map icons to features
  const featureIcons = [
    <Clock key="clock" className="w-6 h-6" />,
    <Map key="map" className="w-6 h-6" />,
    <Monitor key="monitor" className="w-6 h-6" />,
    <Globe key="globe" className="w-6 h-6" />
  ];

  return (
    <section className="w-full bg-background py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-textPrimary mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg md:text-xl text-textSecondary max-w-3xl mx-auto leading-relaxed">
            {content.intro_paragraph}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {content.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={featureIcons[index]}
              text={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 
