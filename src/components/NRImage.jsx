import React from "react";
import Image from "next/image";
import { useState } from "react";

const NRImage = (props) => {
  const [error, setError] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Image
        // fill
        sizes="(max-width: 768px) 100vw, 33vw"
        {...props}
        src={error ? "/images/noImage.jpeg" : props.src}
        style={{
          ...props.style,
        }}
        onError={() => {
          setError(true);
        }}
        priority
        placeholder="blur"
        blurDataURL="/images/loaderShim.png"
      />
    </div>
  );
};

export default NRImage;
