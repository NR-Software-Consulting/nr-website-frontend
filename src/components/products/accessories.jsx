import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// internal
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { NextArr, PrevArr, ShapeLine } from "@/svg";
import ErrorMsg from "@/components/common/error-msg";
import ProductItem from "./product-item";
import HomeNewArrivalPrdLoader from "@/components/loader/home/home-newArrival-prd-loader";
import { useTranslations } from "next-intl";

// slider setting
const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 30,
  pagination: {
    el: ".tp-arrival-slider-dot",
    clickable: true,
  },
  navigation: {
    nextEl: ".tp-arrival-slider-button-next",
    prevEl: ".tp-arrival-slider-button-prev",
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const Accessories = ({ products, isError, isLoading }) => {
  const t = useTranslations("header");
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <HomeNewArrivalPrdLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && products?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !isError && products?.length > 0) {
    const product_items = products.data;
    content = (
      <Swiper
        {...slider_setting}
        modules={[Navigation, Pagination]}
        className="tp-product-arrival-active swiper-container"
      >
        {products.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            <ProductItem product={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <>
      <section className="tp-product-arrival-area pb-55">
        <div className="container">
          <div className="row  align-items-center mb-40">
            <div className="col-xl-5 col-lg-6 col-md-5">
              <div className="tp-section-title-wrapper">
                <h3 className="tp-section-title">
                  {"All Accessories"}
                  <ShapeLine />
                </h3>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 col-md-7">
              <div className="tp-product-arrival-border"></div>
            </div>
          </div>
          <div className="row">
            <div className="tp-product-arrival-slider fix">{content}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accessories;
