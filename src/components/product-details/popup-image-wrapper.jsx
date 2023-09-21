import React from "react";
import NRImage from "../NRImage";
import { Box } from "@mui/material";
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
              <Box sx={{ height: 416, width: 416 }}>
                <NRImage src={imageURLs} alt="product img" quality={100} />
              </Box>
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
