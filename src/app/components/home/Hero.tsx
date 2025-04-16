"use client";

import React from "react";
import Distance from "@/app/components/common/Distance";

const Hero: React.FC<{ title: string; subtitle: string;  }> = ({ title, subtitle }) => {

  return (
    <>
      <Distance title={title} subtitle={subtitle} tripOption={1} dropdownHidden={false} />
    </>
  );
};

export default Hero;
