import React from "react";
import NRImage from "../NRImage";
const PopupThumbWrapper = ({
  imageURLs,
  imgWidth = 416,
  imgHeight = 500,
  status,
}) => {
  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              <NRImage
                src={imageURLs}
                alt="product img"
                width={imgWidth}
                height={imgHeight}
                quality={100}
                style={{
                  layout: "responsive",
                  objectFit: "fill",
                  cursor: "auto",
                }}
                className="img-fluid"
              />
              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupThumbWrapper;
