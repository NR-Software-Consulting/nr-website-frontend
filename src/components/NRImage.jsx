import React from "react";
import Image from "next/image";
import { useState } from "react";
import { Box } from "@mui/material";

const NRImage = (props) => {
  const [error, setError] = useState(false);
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Image
        fill
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
    </Box>
  );
};

export default NRImage;
