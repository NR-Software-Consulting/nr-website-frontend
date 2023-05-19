import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import NRImage from "@/components/NRImage";
import { ProductImages } from "@/components/json-data/data";
import { Box } from "@mui/material";
const ImageSlider = () => {
  return (
    <>
      <Swiper
        pagination={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {ProductImages.map((data) => {
          return (
            <SwiperSlide>
              <Box
                sx={{
                  height: { xs: 200, sm: 300, md: 400, lg: 550 },
                  width: "100%",
                  objectFit: "contain",
                }}
              >
                <NRImage src={data.img} alt="product image" />
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ImageSlider;
