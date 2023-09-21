import { useState } from "react";
import PopupVideo from "../common/popup-video";
import NRImage from "../NRImage";
import { Box } from "@mui/material";

const DetailsThumbWrapper = ({ imageURLs, status }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    imageURLs?.[0]?.attributes?.images?.data[0].attributes.url
  );

  return (
    <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex justify-content-evenly">
      <nav>
        <div className="nav nav-tabs flex-sm-column ">
          {imageURLs?.map((item, i) =>
            item?.attributes?.images?.data?.map((images) => (
              <button
                key={i}
                className={`nav-link ${
                  selectedImage === images?.attributes.url ? "active" : ""
                }`}
                onClick={() => setSelectedImage(images?.attributes.url)}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: 100,
                  }}
                >
                  <NRImage src={images?.attributes?.url} alt="product img" />
                </Box>
              </button>
            ))
          )}
        </div>
      </nav>
      <div className="tab-content m-img">
        <div className="tab-pane fade show active">
          <Box
            sx={{
              width: { xs: "100%", sm: 400, md: 400, lg: 550 },
              height: { xs: 400, sm: 400, md: 450, lg: 550 },
            }}
          >
            <NRImage src={selectedImage} alt="product img" />
          </Box>
          <div className="tp-product-badge">
            {status === "out-of-stock" && (
              <span className="product-hot">out-stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsThumbWrapper;
