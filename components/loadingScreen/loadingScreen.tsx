import React from "react";
import loadGif from "@/public/loadGif.gif";
import Image from "next/image";
import style from "./loadingScreen.module.scss";

const LoadingScreen = () => {
  return (
    <div className={style.main}>
      <div className={style.loadImg}>
        <Image
          src={loadGif}
          alt="Loading"
          width={400}
          height={500}
          priority={true}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
