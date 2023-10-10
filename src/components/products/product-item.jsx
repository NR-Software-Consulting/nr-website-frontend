import React from "react";
import Link from "next/link";
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
import NRImage from "../NRImage";
import { Box } from "@mui/material";

const ProductItem = ({ product, offer_style = false }) => {
  const { onAddToCart, cartItems } = useCart();
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
  const authChecked = useAuthCheck();
  const route = useRouter();
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
            <Box
              sx={{
                width: "100%",
                height: 250,
              }}
            >
              <NRImage
                src={product?.attributes?.images?.data[0]?.attributes?.url}
                alt="product img"
                style={{ objectFit: "contain" }}
              />
            </Box>
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
                  className={`tp-product-action-btn mb-10 rounded-circle ${
                    isAddedToCart ? "active" : ""
                  } tp-product-add-cart-btn`}
                >
                  <Cart />
                  <span className="tp-product-tooltip">Add to Cart</span>
                </button>
              )}
              <button
                onClick={() => dispatch(handleProductModal(product))}
                type="button"
                className="tp-product-action-btn tp-product-quick-view-btn rounded-circle mb-10 md-none d-none d-lg-block"
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
              >
                <Wishlist />
                {!isAddedToWishlist ? (
                  <span className="tp-product-tooltip">Add To Wishlist</span>
                ) : (
                  <span className="tp-product-tooltip">
                    Remove From Wishlist
                  </span>
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
                ? `${product.attributes.title.slice(0, 20)}...`
                : product.attributes.title}
            </Link>
          </h3>
          <div className="tp-product-price-wrapper">
            {product?.attributes?.discount > 0 ? (
              <>
                <span className="tp-product-price old-price">
                  PKR {(product?.attributes?.price).toFixed(2)}
                </span>
                <span className="tp-product-price new-price">
                  {" "}
                  PKR{" "}
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
                PKR {parseFloat(product?.attributes?.price).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
