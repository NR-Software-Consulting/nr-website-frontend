import { useState } from "react";
import PopupVideo from "../common/popup-video";
import NRImage from "../NRImage";

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
                <NRImage
                  src={images?.attributes?.url}
                  alt="image"
                  width={100}
                  height={100}
                  style={{ objectFit: "fill", layout: "responsive" }}
                  className="img-fluid"
                />
              </button>
            ))
          )}
        </div>
      </nav>
      <div className="tab-content m-img">
        <div className="tab-pane fade show active">
          <NRImage
            src={selectedImage}
            alt="product img"
            width={1200}
            height={600}
            style={{ layout: "responsive" }}
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
  );
};

export default DetailsThumbWrapper;
