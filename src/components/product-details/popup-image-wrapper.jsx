import React from "react";
import NRImage from "../NRImage";
import { Box } from "@mui/material";
const PopupThumbWrapper = ({ imageURLs }) => {
  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex align-items-center">
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              <Box sx={{ height: 416, width: 416 }}>
                <NRImage src={imageURLs} alt="product img" quality={100} />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupThumbWrapper;
