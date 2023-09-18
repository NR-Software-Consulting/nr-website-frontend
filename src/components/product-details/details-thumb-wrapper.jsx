import { useState } from "react";
import PopupVideo from "../common/popup-video";

const DetailsThumbWrapper = ({ imageURLs, status }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    imageURLs?.[0]?.attributes?.images?.data[0].attributes.url
  );

  return (
    <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
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
                <img
                  src={images?.attributes?.url}
                  alt="image"
                  width={78}
                  height={100}
                  style={{ width: "100%", height: "100%", quality: 100 }}
                />
              </button>
            ))
          )}
        </div>
      </nav>
      <div className="tab-content m-img">
        <div className="tab-pane fade show active">
          <img
            src={selectedImage}
            alt="product img"
            width={"100%"}
            height={670}
            style={{ objectFit: "fill" }}
          />
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
