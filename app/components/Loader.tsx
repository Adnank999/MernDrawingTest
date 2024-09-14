"use client";
import React from "react";
import Lottie from "react-lottie-player";
import animation from "../../public/animation.json";
const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        loop
        animationData={animation}
        play
        style={{ width: 450, height: 450 }}
      />
      <h1 className="text-3xl text-white font-bold">Loading...Please wait</h1>
    </div>
  );
};

export default Loader;
