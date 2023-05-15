import React from "react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { Box } from "@mui/material";

interface props extends ImageProps {
  zIndex?: number;
}
const NRImage = (props: props) => {
  const [error, setError] = useState(false);
  return (
    <Box style={{ width: "100%", height: "100%", position: "relative" }}>
      <Image
        fill
        {...props}
        src={error ? "/noImage.jpeg" : props.src}
        style={{
          ...props.style,
        }}
        onError={() => {
          setError(true);
        }}
        priority
        placeholder="blur"
        blurDataURL="/loaderShim.png"
      />
    </Box>
  );
};

export default NRImage;
