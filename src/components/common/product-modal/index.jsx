import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { handleModalClose } from "@/redux/features/productModalSlice";
import { initialOrderQuantity } from "@/redux/features/cartSlice";
import PopUpWrapper from "@/components/product-details/popup-wrapper";
import PopupThumbWrapper from "@/components/product-details/popup-image-wrapper";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const ProductModal = () => {
  const { productItem, isModalOpen } = useSelector(
    (state) => state.productModal
  );
  const [colour, setColour] = useState("");
  const [activeColor, setActiveColor] = useState(null);
  const [modal, setModal] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const img = productItem?.attributes?.images?.data[0]?.attributes?.url;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialOrderQuantity());
  }, [img, dispatch]);
  useEffect(() => {
    const handleBodyScroll = (event) => {
      if (isModalOpen) {
        event.preventDefault();
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleBodyScroll);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleBodyScroll);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleBodyScroll);
    };
  }, [isModalOpen]);
  const handleProductColour = (item) => {
    setColour(item?.title);
    setActiveColor(item);
  };
  const handleProductModal = (item) => {
    setModal(item?.title);
    setActiveModal(item);
  };
  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(handleModalClose())}
        style={customStyles}
        contentLabel="Product Modal"
        shouldCloseOnEsc={false}
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex">
            <button
              onClick={() => dispatch(handleModalClose())}
              type="button"
              className="tp-product-modal-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
            <PopupThumbWrapper imageURLs={img} />
            <PopUpWrapper
              productItem={productItem}
              colour={colour}
              setColour={setColour}
              activeColor={activeColor}
              handleProductColour={handleProductColour}
              modal={modal}
              setModal={setModal}
              activeModal={activeModal}
              handleProductModal={handleProductModal}
            />
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ProductModal;
