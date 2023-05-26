import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";
import NRImage from "@/components/NRImage";
import { CategoryList, ProductImages } from "@/components/json-data/data";
import { Box, Grid, Typography } from "@mui/material";
import { CustomContainer } from "@/components/layout";
import { styles } from "./styles";

const ImageSlider = () => {
  return (
    <CustomContainer>
      <Grid
        container
        item
        xs={11.5}
        sm={11.5}
        md={11.5}
        lg={12}
        columnGap={2}
        sx={styles.MainGrid}
      >
        <Grid item xs={12} sm={3} md={3} lg={1.8}>
          {CategoryList.map((list) => {
            return <Typography sx={styles.typo}>{list.name}</Typography>;
          })}
        </Grid>
        <Grid item xs={12} sm={8.7} md={8.7} lg={8}>
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
                      height: { xs: 200, sm: 320 },
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
        </Grid>
        <Grid
          item
          md={12}
          lg={1.8}
          sx={{ display: { xs: "none", lg: "block" } }}
        >
          {CategoryList.map((list) => {
            return <Typography sx={styles.typo}>{list.name}</Typography>;
          })}
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default ImageSlider;
