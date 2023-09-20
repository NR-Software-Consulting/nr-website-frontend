import React, { useState, useEffect } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import DetailsTabNav from "./details-tab-nav";

const ProductDetailsArea = ({ productItem }) => {
  const { img, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(img);
  useEffect(() => {
    setActiveImg(img);
  }, [img]);
  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <DetailsThumbWrapper
                activeImg={activeImg}
                imageURLs={productItem}
                videoId={videoId}
                status={status}
              />
            </div>
            <div className="col-xl-5 col-lg-6">
              <DetailsWrapper
                productItem={productItem}
                activeImg={activeImg}
                detailsBottom={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="tp-product-details-bottom pb-140">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <DetailsTabNav product={productItem} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsArea;
