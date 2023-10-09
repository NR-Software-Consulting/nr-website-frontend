import React, { useEffect, useState } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import DetailsTabNav from "./details-tab-nav";

const ProductDetailsArea = ({ productItem }) => {
  const [selectedImage, setSelectedImage] = useState(
    productItem?.[0]?.attributes?.images?.data[0].attributes.url
  );
  useEffect(() => {
    setSelectedImage(
      productItem?.[0]?.attributes?.images?.data[0].attributes.url
    );
  }, [productItem]);
  return (
    <section className="tp-product-details-area">
      <div className="tp-product-details-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-6">
              <DetailsThumbWrapper
                imageURLs={productItem}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>
            <div className="col-xl-5 col-lg-6">
              <DetailsWrapper
                productItem={productItem}
                detailsBottom={true}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="tp-product-details-bottom pb-50">
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
