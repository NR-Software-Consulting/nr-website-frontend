import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import empty_cart_img from "@assets/img/product/cartmini/empty-cart.png";
import { closeCartMini } from "@/redux/features/cartSlice";
import { getCookie } from "cookies-next";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";
import { notifySuccess } from "@/utils/toast";
import { Box, Typography } from "@mui/material";
import NRImage from "../NRImage";

const CartMiniSidebar = () => {
  const t = useTranslations("header");
  const { cartMiniOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const token = getCookie("token");
  const { deleteCartItem, cartItems, totalPrice } = useCart();
  const [shipCost, setShipCost] = useState(250);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userCookie = getCookie("userInfo");
    const user = userCookie ? JSON.parse(userCookie) : null;
    setUserInfo(user);
  }, []);
  useEffect(() => {
    const handleBodyScroll = (event) => {
      if (cartMiniOpen) {
        event.preventDefault();
      }
    };
    if (cartMiniOpen) {
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
  }, [cartMiniOpen]);
  const handleRemovePrd = async (productId) => {
    await deleteCartItem(productId);
    notifySuccess("Successfully Removed from cart");
  };
  const handleCloseCartMini = () => {
    dispatch(closeCartMini());
  };

  return (
    <>
      <div
        className={`cartmini__area tp-all-font-roboto ${
          cartMiniOpen ? "cartmini-opened" : ""
        }`}
      >
        <div className="cartmini__wrapper d-flex justify-content-between flex-column">
          <div className="cartmini__top-wrapper">
            <div className="cartmini__top p-relative">
              <div className="cartmini__top-title">
                <h4>{t("Shopping cart")}</h4>
              </div>
              <div className="cartmini__close">
                <button
                  onClick={() => dispatch(closeCartMini())}
                  type="button"
                  className="cartmini__close-btn cartmini-close-btn"
                  aria-label="cartmini close"
                >
                  <i className="fal fa-times"></i>
                </button>
              </div>
            </div>
            {cartItems.length > 0 && (
              <div className="cartmini__widget">
                {cartItems.map((item) => (
                  <div key={item.id} className="cartmini__widget-item">
                    <div className="cartmini__thumb">
                      <Link
                        href={`/product/${item?.attributes?.product?.data?.attributes?.slug}`}
                      >
                        <Box sx={{ height: 70, width: 70 }}>
                          <NRImage
                            src={
                              item?.attributes?.product?.data?.attributes
                                ?.images?.data[0]?.attributes?.url
                            }
                            alt="product img"
                          />
                        </Box>
                      </Link>
                    </div>
                    <div className="cartmini__content">
                      <h5 className="cartmini__title">
                        <Link
                          href={`/product/${item?.attributes?.product?.data?.attributes?.slug}`}
                        >
                          {item?.attributes?.product?.data?.attributes?.title}
                        </Link>
                      </h5>
                      <div className="cartmini__price-wrapper">
                        <span className="cartmini__price">
                          PKR{" "}
                          {(
                            item?.attributes?.product?.data?.attributes?.price -
                            (item?.attributes?.product?.data?.attributes
                              ?.price *
                              item?.attributes?.product?.data?.attributes
                                ?.discount) /
                              100
                          )?.toFixed(2)}
                        </span>
                        <span className="cartmini__quantity">
                          {" "}
                          x {item?.attributes?.quantity}
                        </span>
                      </div>
                    </div>
                    <a
                      onClick={() => handleRemovePrd(item.id)}
                      className="cartmini__del cursor-pointer"
                    >
                      <i className="fa-regular fa-xmark"></i>
                    </a>
                  </div>
                ))}
              </div>
            )}
            {cartItems.length === 0 && (
              <div className="cartmini__empty text-center">
                <Image src={empty_cart_img} alt="empty-cart-img" />
                <p>{t("Your Cart is empty")}</p>
                <Link href="/products" className="tp-btn">
                  {t("Go to Shop")}
                </Link>
              </div>
            )}
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title d-flex justify-content-between">
              <Typography fontSize={"14px"}>{t("Total")}</Typography>
              <Typography fontSize={"14px"}>
                PKR {totalPrice.toFixed(2)}
              </Typography>
            </div>
            <div className="cartmini__checkout-title d-flex justify-content-between">
              <Typography fontSize={"14px"}>{t("Shipping")}</Typography>
              <Typography fontSize={"14px"}>
                PKR {shipCost.toFixed(2)}
              </Typography>
            </div>
            <div className="cartmini__checkout-title mb-30">
              <h4>{t("Subtotal")}</h4>
              <span>PKR {(totalPrice + shipCost).toFixed(2)}</span>
            </div>
            <div className="cartmini__checkout-btn">
              <Link
                href="/cart"
                onClick={handleCloseCartMini}
                className="tp-btn mb-10 w-100"
              >
                {t("view cart")}
              </Link>
              <Link
                href="/checkout"
                onClick={handleCloseCartMini}
                className="tp-btn tp-btn-border w-100"
              >
                {" "}
                {t("checkout")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* overlay start */}
      <div
        onClick={handleCloseCartMini}
        className={`body-overlay ${cartMiniOpen ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default CartMiniSidebar;
