import React, { useState } from "react";
import DetailsBottomInfo from "./details-bottom-info";
import ProductQuantity from "./product-quantity";
import { notifySuccess, notifyError } from "@/utils/toast";
import useAuthCheck from "@/hooks/use-auth-check";
import { useCart } from "@/hooks/use-cart";
import { useWishList } from "@/hooks/use-wishlist";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Box, Rating, Typography } from "@mui/material";

const DetailsWrapper = ({
  productItem,
  detailsBottom = false,
  handleProductColour,
  handleProductModal,
  colour,
  activeColor,
  modal,
  activeModal,
}) => {
  const { addProductToWishList, removeProductToWishList, wishlist } =
    useWishList();
  const { onAddToCart, cartItems, deleteCartItem } = useCart();
  const t = useTranslations("header");
  const product = productItem[0];
  const productRating = product?.attributes?.user_review.map((item) => {
    return item?.rating;
  });
  const filteredRatings = productRating.filter(
    (rating) => rating !== undefined
  );
  const averageRating =
    filteredRatings.length > 0
      ? filteredRatings.reduce((acc, rating) => acc + rating, 0) /
        filteredRatings.length
      : 0;
  const isAddedToCart =
    cartItems?.some(
      (prd) => prd.attributes.product?.data?.id === product?.id
    ) || false;
  const cartItem =
    cartItems?.find(
      (prd) => prd.attributes.product?.data?.id === product?.id
    ) || {};
  const isAddedToWishlist = wishlist.some(
    (prd) => prd?.attributes?.product?.data?.id === product?.id
  );
  const wishlistItem = wishlist.find(
    (prd) => prd?.attributes?.product?.data?.id === product?.id
  );
  const [quantity, setQuantity] = useState(1);
  const authChecked = useAuthCheck();
  const route = useRouter();
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const handleAddProduct = () => {
    if (!authChecked) {
      notifyError("Please login to purchase!");
      route.push("/login");
    } else {
      onAddToCart({
        product: product.id,
        quantity: quantity,
        colour: colour,
        modal: modal,
      });
    }
  };
  const handleRemoveToCart = async () => {
    await deleteCartItem(cartItem.id);
    setQuantity(1);
    notifySuccess("Successfully Removed from cart");
  };
  const handleWishlistProduct = (prd) => {
    if (!authChecked) {
      notifyError("Please login to wishlist!");
      route.push("/login");
    } else {
      addProductToWishList({
        product: product.id,
      });
    }
  };

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{product?.attributes?.category?.data?.attributes?.name}</span>
      </div>
      <h3 className="tp-product-details-title">{product?.attributes?.title}</h3>
      {product?.attributes?.user_review.length > 0 ? (
        <div className="tp-product-details-price-wrapper d-flex align-item-center mb-10">
          <Rating value={averageRating} readOnly precision={0.5} />
          <span style={{ color: "grey" }}>
            ({filteredRatings.length}{" "}
            {filteredRatings.length === 1 ? "review" : "reviews"})
          </span>
        </div>
      ) : null}
      <div className="tp-product-details-price-wrapper mb-10">
        {product?.attributes?.discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">
              PKR {(product?.attributes?.price).toFixed(2)}
            </span>{" "}
            <span className="tp-product-details-price new-price">
              PKR{" "}
              {(
                Number(product?.attributes?.price) -
                (Number(product?.attributes?.price) *
                  Number(product?.attributes?.discount)) /
                  100
              ).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            PKR {product?.attributes?.price?.toFixed(2)}
          </span>
        )}
      </div>
      {product?.attributes?.colour &&
        product?.attributes?.colour.length > 0 && (
          <div className="tp-product-details-variation">
            <div className="tp-product-details-variation-item">
              <h4 className="tp-product-details-variation-title">Color :</h4>
              <div className="tp-product-details-variation-list">
                {product?.attributes?.colour.map((item, i) => (
                  <button
                    onClick={() => handleProductColour(item)}
                    key={i}
                    type="button"
                    className={`color tp-color-variation-btn ${
                      activeColor === item ? "active" : ""
                    }`}
                  >
                    <span
                      data-bg-color={`${item.title}`}
                      style={{
                        backgroundColor: `${item.title}`,
                        border: "1.5px solid",
                      }}
                    ></span>
                    {item.title && (
                      <span className="tp-color-variation-tootltip">
                        {item.title}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      {product?.attributes?.modal && product?.attributes?.modal.length > 0 && (
        <div className="tp-product-details-variation">
          <h4 className="tp-product-details-variation-title">Modal:</h4>
          {product?.attributes?.modal.map((item, i) => (
            <button
              onClick={() => handleProductModal(item)}
              key={i}
              type="button"
              className="mr-10"
            >
              <Box
                sx={{
                  border: "1px solid black",
                  width: "100%",
                  margin: "0px 0px 10px 0px",
                  backgroundColor: activeModal === item ? "#f3f5f6" : "white",
                  boxShadow:
                    activeModal === item
                      ? "0px 1px 2px rgba(1, 15, 28, 0.2)"
                      : "",
                  borderColor: activeModal === item ? "#f3f5f6" : "black",
                }}
              >
                <Typography sx={{ padding: "3px 10px" }}>
                  {item.title}
                </Typography>
              </Box>
            </button>
          ))}
        </div>
      )}
      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">{t("Quantity")}</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          {!isAddedToCart && (
            <ProductQuantity
              onQuantityChange={handleQuantityChange}
              productId={product?.id}
            />
          )}
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() =>
                !isAddedToCart ? handleAddProduct() : handleRemoveToCart()
              }
              className="tp-product-details-add-to-cart-btn w-100"
              style={{
                backgroundColor: isAddedToCart
                  ? "var(--tp-theme-primary)"
                  : "var(--tp-common-black)",
              }}
            >
              {isAddedToCart ? t("Remove from Cart") : t("Add To Cart")}
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-details-add-to-cart mb-15 w-100">
        <button
          onClick={() =>
            isAddedToWishlist
              ? removeProductToWishList({
                  deleteFavouriteId: wishlistItem.id,
                })
              : handleWishlistProduct(product)
          }
          className="tp-product-details-add-to-cart-btn w-100"
          style={{
            backgroundColor: isAddedToWishlist
              ? "var(--tp-theme-primary)"
              : "var(--tp-common-black)",
          }}
        >
          {!isAddedToWishlist
            ? t("Add to Wishlist")
            : t("Remove from Wishlist")}
        </button>
      </div>
      {detailsBottom && (
        <DetailsBottomInfo
          category={product?.attributes?.category?.data?.attributes?.name}
          SubCategory={
            product?.attributes?.sub_category?.data?.attributes?.name
          }
          brand={product?.attributes?.brands?.data?.attributes?.name}
          productLink={product?.attributes?.yt_link}
        />
      )}
    </div>
  );
};

export default DetailsWrapper;
