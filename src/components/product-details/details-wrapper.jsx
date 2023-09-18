import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { AskQuestion, WishlistTwo } from "@/svg";
import DetailsBottomInfo from "./details-bottom-info";
import ProductDetailsCountdown from "./product-details-countdown";
import ProductQuantity from "./product-quantity";
import { notifySuccess, notifyError } from "@/utils/toast";
import { setCookie, getCookie } from "cookies-next";
import useAuthCheck from "@/hooks/use-auth-check";
import { add_to_compare } from "@/redux/features/compareSlice";
import { useCart } from "@/hooks/use-cart";
import { useWishList } from "@/hooks/use-wishlist";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
const DetailsWrapper = ({
  productItem,
  handleImageActive,
  activeImg,
  detailsBottom = false,
}) => {
  const { imageURLs, discount, status, offerExpiryTime } = productItem || {};
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
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const token = getCookie("token");
  const authChecked = useAuthCheck();
  const route = useRouter();
  // useEffect(() => {
  //   if (reviews && reviews.length > 0) {
  //     const rating =
  //       reviews.reduce((acc, review) => acc + review.rating, 0) /
  //       reviews.length;
  //     setRatingVal(rating);
  //   } else {
  //     setRatingVal(0);
  //   }
  // }, [reviews]);

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
  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{product?.attributes?.category?.data?.attributes?.name}</span>
      </div>
      <h3 className="tp-product-details-title">{product?.attributes?.title}</h3>
      {/*<div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div>
        <div className="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
          <div className="tp-product-details-rating">
            <Rating
              allowFraction
              size={16}
              initialValue={ratingVal}
              readonly={true}
            />
          </div>
          <div className="tp-product-details-reviews">
            <span>
              ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
            </span>
          </div>
        </div>
      </div> */}
      {product?.attributes?.description?.length > 0 ? (
        <p>
          {textMore
            ? product?.attributes?.description
            : `${product?.attributes?.description?.substring(0, 100)}...`}{" "}
          <span
            className="cursor-pointer"
            onClick={() => setTextMore(!textMore)}
          >
            {textMore ? t("See Less") : t("See More")}
          </span>
        </p>
      ) : (
        <p>No Description</p>
      )}
      <div className="tp-product-details-price-wrapper mb-20">
        {product?.attributes?.discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">
              SAR {product?.attributes?.price}
            </span>{" "}
            <span className="tp-product-details-price new-price">
              SAR{" "}
              {(
                Number(product?.attributes?.price) -
                Number(product?.attributes?.discount)
              ).toFixed(2)}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">
            SAR {product?.attributes?.price?.toFixed(2)}
          </span>
        )}
      </div>
      {offerExpiryTime && (
        <ProductDetailsCountdown offerExpiryTime={offerExpiryTime} />
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
            {!isAddedToCart ? (
              <button
                onClick={handleAddProduct}
                disabled={isAddedToCart}
                className="tp-product-details-add-to-cart-btn w-100"
              >
                {t("Add To Cart")}
              </button>
            ) : (
              <button
                onClick={handleRemoveToCart}
                className="tp-product-details-add-to-cart-btn w-100"
              >
                {t("Remove from Cart")}
              </button>
            )}
          </div>
        </div>
        {/* <Link href="/cart" onClick={() => dispatch(handleModalClose())}>
          <button className="tp-product-details-buy-now-btn w-100">
            {t("Buy Now")}
          </button>
        </Link> */}
      </div>
      <div className="tp-product-details-action-sm">
        <button
          disabled={status === "out-of-stock"}
          onClick={() =>
            isAddedToWishlist
              ? removeProductToWishList({
                  deleteFavouriteId: wishlistItem.id,
                })
              : handleWishlistProduct(product)
          }
          type="button"
          className="tp-product-details-action-sm-btn"
        >
          <WishlistTwo />
          {!isAddedToWishlist
            ? t("Add to Wishlist")
            : t("Remove from Wishlist")}
        </button>
        <button type="button" className="tp-product-details-action-sm-btn">
          <AskQuestion />
          {t("Ask a question")}
        </button>
      </div>
      {detailsBottom && (
        <DetailsBottomInfo
          category={product?.attributes?.category?.data?.attributes?.name}
          sku={product?.attributes?.sku}
          tag={product?.attributes?.sub_category?.data?.attributes?.name}
          brand={product?.attributes?.brands?.data?.attributes?.name}
        />
      )}
    </div>
  );
};

export default DetailsWrapper;
