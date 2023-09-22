import React, { useState } from "react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import slider_img_1 from "@assets/img/slider/slider-img-1.png";
import slider_img_2 from "@assets/img/slider/slider-img-2.png";
import slider_img_3 from "@assets/img/slider/slider-img-3.png";
import shape_1 from "@assets/img/slider/shape/slider-shape-1.png";
import shape_4 from "@assets/img/slider/shape/slider-shape-4.png";
import { ArrowRightLong, SliderNextBtn, SliderPrevBtn, TextShape } from "@/svg";
import NRImage from "../NRImage";
import { Box } from "@mui/material";

const sliderData = [
  {
    id: 1,
    pre_title: { text: "Starting at", price: 4000 },
    title: "New Headphone collection 2023",
    subtitle: {
      text_1: "Exclusive offers on multiple products",
    },
    img: slider_img_3,
    green_bg: true,
  },
  {
    id: 2,
    pre_title: { text: "Starting at", price: 5000 },
    title: "New Airpods collection 2023",
    subtitle: {
      text_1: "Exclusive offers on multiple products",
    },
    img: slider_img_2,
    green_bg: true,
  },

  {
    id: 3,
    pre_title: { text: "Starting at", price: 5000 },
    title: "The best Watches Collection 2023",
    subtitle: {
      text_1: "Exclusive offers on multiple products",
    },
    img: slider_img_1,
    green_bg: true,
  },
];
function Shape({ img, num }) {
  return (
    <Image
      className={`tp-slider-shape-${num}`}
      src={img}
      alt="slider-shape"
      priority
    />
  );
}

const HomeHeroSlider = () => {
  const [active, setActive] = useState(false);
  const handleActiveIndex = (index) => {
    if (index === 3) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <>
      <section className="tp-slider-area p-relative z-index-1">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={false}
          effect="fade"
          navigation={{
            nextEl: ".tp-slider-button-next",
            prevEl: ".tp-slider-button-prev",
          }}
          onSlideChange={(swiper) => handleActiveIndex(swiper.activeIndex)}
          pagination={{ el: ".tp-slider-dot", clickable: true }}
          autoplay={true}
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          className={`tp-slider-active tp-slider-variation swiper-container`}
        >
          {sliderData.map((item) => (
            <SwiperSlide
              key={item.id}
              className={`tp-slider-item tp-slider-height d-flex align-items-center`}
              style={{ backgroundColor: "black" }}
            >
              <div className="tp-slider-shape">
                <Shape img={shape_1} num="1" />
                <Shape img={shape_4} num="4" />
              </div>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-xl-8 col-lg-7 col-md-7">
                    <div className="tp-slider-content p-relative z-index-1">
                      <span>
                        {item.pre_title.text} <b>PKR {item.pre_title.price}</b>
                      </span>
                      <h3 className="tp-slider-title">{item.title}</h3>
                      <p>{item.subtitle.text_1}</p>

                      <div className="tp-slider-btn">
                        <Link
                          href="/products"
                          className="tp-btn tp-btn-2 tp-btn-white"
                        >
                          Shop Now <ArrowRightLong />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-5 col-md-5">
                    <div className="tp-slider-thumb text-end">
                      <Box sx={{ height: 400, width: "100%" }}>
                        <NRImage
                          src={item.img}
                          alt="slider-img"
                          style={{
                            // height: 400,
                            // width: 400,
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="tp-slider-arrow tp-swiper-arrow">
            <button type="button" className="tp-slider-button-prev">
              <SliderPrevBtn />
            </button>
            <button type="button" className="tp-slider-button-next">
              <SliderNextBtn />
            </button>
          </div>
          <div className="tp-slider-dot tp-swiper-dot"></div>
        </Swiper>
      </section>
    </>
  );
};

export default HomeHeroSlider;
