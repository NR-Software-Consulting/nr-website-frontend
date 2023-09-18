import React, { useState } from "react";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { Cart, QuickView, Wishlist } from "@/svg";
import Timer from "@/components/common/timer";
import { handleProductModal } from "@/redux/features/productModalSlice";
import useAuthCheck from "@/hooks/use-auth-check";
import { useRouter } from "next/router";
import { notifyError } from "@/utils/toast";
import { useCart } from "@/hooks/use-cart";
import { useWishList } from "@/hooks/use-wishlist";

const ProductItem = ({ product, offer_style = false }) => {
  const { _id, reviews, discount, status, offerExpiryTime } = product || {};
  const { onAddToCart, onUpdateCart, cartItems } = useCart();
  const { addProductToWishList, removeProductToWishList, wishlist } =
    useWishList();
  const isAddedToCart =
    cartItems?.some(
      (prd) => prd?.attributes?.product?.data?.id === product?.id
    ) || false;
  const isAddedToWishlist = wishlist.some(
    (prd) => prd?.attributes?.product?.data?.id === product?.id
  );
  const wishlistItem = wishlist.find(
    (prd) => prd?.attributes?.product?.data?.id === product?.id
  );
  const dispatch = useDispatch();
  const [ratingVal, setRatingVal] = useState(0);
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

  const handleAddProduct = () => {
    if (!authChecked) {
      notifyError("Please login to purchase!");
      route.push("/login");
    } else {
      onAddToCart({
        product: product.id,
        quantity: 1,
      });
    }
  };
  const handleWishlistProduct = (prd) => {
    if (!authChecked) {
      notifyError("Please login to purchase!");
      route.push("/login");
    } else {
      addProductToWishList({
        product: product.id,
      });
    }
  };
  return (
    <>
      <div
        className={`${
          offer_style ? "tp-product-offer-item bg-white" : "mb-25"
        } tp-product-item transition-3`}
      >
        <div className="tp-product-thumb p-relative fix">
          <Link href={`/product/${product?.attributes?.slug}`}>
            <img
              src={product?.attributes?.images?.data[0]?.attributes?.url}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              alt="product-electronic"
            />
            <div className="tp-product-badge">
              {status === "out-of-stock" && (
                <span className="product-hot">out-stock</span>
              )}
            </div>
          </Link>
          <div className="tp-product-action">
            <div className="tp-product-action-item d-flex flex-column">
              {isAddedToCart && authChecked ? (
                <Link
                  href="/cart"
                  className={`tp-product-action-btn rounded-circle ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart /> <span className="tp-product-tooltip">View Cart</span>
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct()}
                  type="button"
                  className={`tp-product-action-btn rounded-circle ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                  disabled={status === "out-of-stock"}
                >
                  <Cart />
                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn rounded-circle mt-10 mb-10"
              >
                <QuickView />
                <span className="tp-product-tooltip">Quick View</span>
              </button>
              <button
                type="button"
                className={`tp-product-action-btn rounded-circle ${
                  isAddedToWishlist ? "active" : ""
                } tp-product-add-to-wishlist-btn`}
                onClick={() =>
                  isAddedToWishlist
                    ? removeProductToWishList({
                        deleteFavouriteId: wishlistItem.id,
                      })
                    : handleWishlistProduct(product)
                }
                disabled={status === "out-of-stock"}
              >
                <Wishlist />
                {!isAddedToWishlist ? (
                  <span className="tp-product-tooltip">Add To Wishlist</span>
                ) : (
                  <span className="tp-product-tooltip">Remove To Wishlist</span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="tp-product-content">
          <div className="tp-product-category">
            <a>
              {product?.attributes?.category?.data?.attributes?.name.length > 30
                ? `${product?.attributes?.category?.data?.attributes?.name.slice(
                    0,
                    30
                  )}...`
                : product?.attributes?.category?.data?.attributes?.name}
            </a>
          </div>
          <h3 className="tp-product-title">
            <Link href={`/product/${product?.attributes?.slug}`}>
              {product?.attributes?.title.length > 25
                ? `${product.attributes.title.slice(0, 25)}...`
                : product.attributes.title}
            </Link>
          </h3>
          <div className="tp-product-rating d-flex align-items-center">
            <div className="tp-product-rating-icon">
              <Rating
                allowFraction
                size={16}
                initialValue={ratingVal}
                readonly={true}
              />
            </div>
            <div className="tp-product-rating-text">
              <span>
                ({reviews && reviews.length > 0 ? reviews.length : 0} Review)
              </span>
            </div>
          </div>
          <div className="tp-product-price-wrapper">
            {product?.attributes?.discount > 0 ? (
              <>
                <span className="tp-product-price old-price">
                  SAR {product?.attributes?.price}
                </span>
                <span className="tp-product-price new-price">
                  {" "}
                  SAR{" "}
                  {(
                    product?.attributes?.price -
                    (product?.attributes?.price *
                      product?.attributes?.discount) /
                      100
                  ).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="tp-product-price new-price">
                SAR {parseFloat(product?.attributes?.price).toFixed(2)}
              </span>
            )}
          </div>
          {offer_style && (
            <div className="tp-product-countdown">
              <div className="tp-product-countdown-inner">
                {dayjs().isAfter(offerExpiryTime) ? (
                  <ul>
                    <li>
                      <span>{0}</span> Day
                    </li>
                    <li>
                      <span>{0}</span> Hrs
                    </li>
                    <li>
                      <span>{0}</span> Min
                    </li>
                    <li>
                      <span>{0}</span> Sec
                    </li>
                  </ul>
                ) : (
                  <Timer expiryTimestamp={new Date(offerExpiryTime)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
