const HeroTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  return (
    <div className="max-w-3xl mx-auto text-center ">
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
