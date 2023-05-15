import { useMediaQuery } from "@mui/material";
import React from "react";
import ProgressBar from "react-scroll-progress-bar";

const Progressbar = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(max-width:1320px)");
  const isDesktop = useMediaQuery("(max-width:1500px)");
  const isLargeScreen = useMediaQuery("(max-width:2571px)");

  return (
    <>
      {isMobile ? (
        <ProgressBar color="#16BCE1" height={61} direction="right" position="top" gradientColor="#eee" />
      ) : isTablet ? (
        <ProgressBar color="#16BCE1" height={69} direction="right" position="top" gradientColor="#eee" />
      ) : isDesktop ? (
        <ProgressBar color="#16BCE1" height={77} direction="right" position="top" gradientColor="#eee" />
      ) : isLargeScreen ? (
        <ProgressBar color="#16BCE1" height={77} direction="right" position="top" gradientColor="#eee" />
      ) : (
        <ProgressBar color="#16BCE1" height={86} direction="right" position="top" gradientColor="#eee" />
      )}
    </>
  );
};

export default Progressbar;
