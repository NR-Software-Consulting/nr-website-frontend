import React, { useState } from "react";
import DetailsBottomInfo from "./details-bottom-info";
import ProductQuantity from "./product-quantity";
import { useCart } from "@/hooks/use-cart";
import useAuthCheck from "@/hooks/use-auth-check";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useWishList } from "@/hooks/use-wishlist";
import { useTranslations } from "next-intl";

const PopUpWrapper = ({ productItem }) => {
  const { deleteCartItem, onAddToCart, cartItems } = useCart();
  const { addProductToWishList, removeProductToWishList, wishlist } =
    useWishList();
  const [quantity, setQuantity] = useState(1);
  const authChecked = useAuthCheck();
  const route = useRouter();
  const t = useTranslations("header");
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const isAddedToCart =
    cartItems?.some(
      (prd) => prd.attributes.product.data.id === productItem.id
    ) || false;
  const cartItem =
    cartItems?.find(
      (prd) => prd.attributes.product.data.id === productItem.id
    ) || {};
  const isAddedToWishlist = wishlist.some(
    (prd) => prd?.attributes?.product?.data?.id === productItem.id
  );
  const wishlistItem = wishlist.find(
    (prd) => prd?.attributes?.product?.data?.id === productItem.id
  );
  const handleAddProduct = () => {
    if (!authChecked) {
      notifyError("Please login to purchase!");
      route.push("/login");
    } else {
      const data = {
        product: productItem?.id,
        quantity: quantity,
      };
      onAddToCart(data);
    }
  };
  const removeFromProduct = () => {
    setQuantity(1);
    deleteCartItem(cartItem.id);
    notifySuccess("Successfully Removed from cart");
  };
  const handleWishlistProduct = (prd) => {
    if (!authChecked) {
      notifyError("Please login to wishlist!");
      route.push("/login");
    } else {
      addProductToWishList({
        product: productItem?.id,
      });
    }
  };
  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{productItem?.attributes?.category?.data?.attributes?.name}</span>
      </div>
      <h3 className="tp-product-details-title">
        {productItem?.attributes?.title}
      </h3>
      <div className="tp-product-details-price-wrapper mb-20">
        {productItem?.attributes?.discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">
              PKR {(productItem?.attributes?.price).toFixed(2)}
            </span>{" "}
            <span className="tp-product-details-price new-price">
              PKR{" "}
              {(
                Number(productItem?.attributes?.price) -
                (Number(productItem?.attributes?.price) *
                  Number(productItem?.attributes?.discount)) /
                  100
              ).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            PKR {productItem?.attributes?.price?.toFixed(2)}
          </span>
        )}
      </div>
      <div className="tp-product-details-variation">
        <div className="tp-product-details-variation-item">
          <h4 className="tp-product-details-variation-title">Color :</h4>
          <div className="tp-product-details-variation-list">
            {productItem?.attributes?.colour.map((item, i) => (
              <button
                // onClick={() => handleImageActive(item)}
                key={i}
                type="button"
                className={`color tp-color-variation-btn`}
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
      <div className="tp-product-details-action-wrapper">
        <h3 className="tp-product-details-action-title">{t("Quantity")}</h3>
        <div className="tp-product-details-action-item-wrapper d-sm-flex align-items-center">
          {!isAddedToCart && (
            <ProductQuantity
              onQuantityChange={handleQuantityChange}
              productId={productItem?.id}
            />
          )}
          <div className="tp-product-details-add-to-cart mb-15 w-100">
            <button
              onClick={() =>
                !isAddedToCart ? handleAddProduct() : removeFromProduct()
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
              : handleWishlistProduct(productItem)
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
      <DetailsBottomInfo
        category={productItem?.attributes?.category?.data?.attributes?.name}
        tag={productItem?.attributes?.sub_category?.data?.attributes?.name}
        brand={productItem?.attributes?.brands?.data?.attributes?.name}
      />
    </div>
  );
};

export default PopUpWrapper;
