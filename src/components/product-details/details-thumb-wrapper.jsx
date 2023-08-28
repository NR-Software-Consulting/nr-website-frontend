import { useState } from "react";
import PopupVideo from "../common/popup-video";

const DetailsThumbWrapper = ({
  imageURLs,
  imgWidth = 416,
  imgHeight = 500,
  videoId = false,
  status,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    imageURLs?.[0]?.attributes?.images?.data[0].attributes.url
  );

  return (
    <>
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
            <div className="tp-product-details-nav-main-thumb p-relative">
              <img
                src={selectedImage}
                alt="product img"
                width={imgWidth}
                height={imgHeight}
                style={{ objectFit: "fill" }}
              />
              <div className="tp-product-badge">
                {status === "out-of-stock" && (
                  <span className="product-hot">out-stock</span>
                )}
              </div>
              {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="tp-product-details-thumb-video"
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal popup start */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
      {/* modal popup end */}
    </>
  );
};

export default DetailsThumbWrapper;
