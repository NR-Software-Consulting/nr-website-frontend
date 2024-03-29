import React, { useEffect, useState } from "react";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import DetailsTabNav from "./details-tab-nav";

const ProductDetailsArea = ({ productItem }) => {
  const [selectedImage, setSelectedImage] = useState(
    productItem?.[0]?.attributes?.images?.data[0].attributes.url
  );
  const [modal, setModal] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [colour, setColour] = useState("");
  const [activeColor, setActiveColor] = useState(null);
  useEffect(() => {
    setSelectedImage(
      productItem?.[0]?.attributes?.images?.data[0].attributes.url
    );
    if (
      productItem?.[0]?.attributes?.colour &&
      productItem?.[0]?.attributes?.colour?.length > 0
    ) {
      setColour(productItem?.[0]?.attributes?.colour[0]?.title);
    }
    if (
      productItem?.[0]?.attributes?.modal &&
      productItem?.[0]?.attributes?.modal?.length > 0
    ) {
      setModal(productItem?.[0]?.attributes?.modal[0]?.title);
    }
  }, [productItem]);
  const handleProductColour = (item) => {
    setColour(item?.title);
    setActiveColor(item);
  };
  const handleProductModal = (item) => {
    setModal(item?.title);
    setActiveModal(item);
  };
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
                colour={colour}
                activeColor={activeColor}
                handleProductColour={handleProductColour}
                modal={modal}
                activeModal={activeModal}
                handleProductModal={handleProductModal}
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
