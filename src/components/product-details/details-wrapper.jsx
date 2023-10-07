import React, { useState } from "react";
import DetailsBottomInfo from "./details-bottom-info";
import ProductQuantity from "./product-quantity";
import { notifySuccess, notifyError } from "@/utils/toast";
import useAuthCheck from "@/hooks/use-auth-check";
import { useCart } from "@/hooks/use-cart";
import { useWishList } from "@/hooks/use-wishlist";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const DetailsWrapper = ({ productItem, detailsBottom = false }) => {
  const { addProductToWishList, removeProductToWishList, wishlist } =
    useWishList();
  const { onAddToCart, cartItems, deleteCartItem } = useCart();
  const t = useTranslations("header");
  const product = productItem[0];
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
  const [selectedColor, setSelectedColor] = useState("");
  const handleChange = (event) => {
    setSelectedColor(event.target.value);
  };
  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{product?.attributes?.category?.data?.attributes?.name}</span>
      </div>
      <h3 className="tp-product-details-title">{product?.attributes?.title}</h3>
      <div className="tp-product-details-price-wrapper mb-20">
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
          tag={product?.attributes?.sub_category?.data?.attributes?.name}
          brand={product?.attributes?.brands?.data?.attributes?.name}
        />
      )}
    </div>
  );
};

export default DetailsWrapper;
