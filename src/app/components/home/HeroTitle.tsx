const HeroTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-textPrimary leading-tight">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-textSecondary mt-4 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    );
  };
  
  export default HeroTitle;
  