import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartTwo, Menu, User, Wishlist } from "@/svg";
import { openCartMini } from "@/redux/features/cartSlice";
import { deleteCookie, getCookie } from "cookies-next";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";
import { notifySuccess } from "@/utils/toast";
import ConfirmationPopup from "@/components/my-account/confirmationPopup";

const HeaderMainRight = ({ setIsCanvasOpen, totalCount }) => {
  const [showPopup, setShowPopup] = useState(false);
  const t = useTranslations("header");
  const { user: userData } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const isToken = getCookie("token");
  const router = useRouter();
  const authChecked = useAuthCheck();
  const handleCartButtonClick = () => {
    if (!authChecked) {
      router.push("/login");
    } else {
      dispatch(openCartMini());
    }
  };
  const handleLogout = () => {
    setShowPopup(true);
  };
  const confirmLogout = () => {
    deleteCookie("token");
    dispatch(userLoggedOut());
    router.push("/");
    setShowPopup(false);
    notifySuccess("Logged Out successfully!");
  };
  const cancelLogout = () => {
    setShowPopup(false);
  };
  return (
    <div className="tp-header-main-right d-flex align-items-center justify-content-end">
      <div className="tp-header-login d-none d-lg-block">
        <div className="d-flex align-items-center">
          {!authChecked ? (
            <div className="tp-header-login-icon">
              <span>
                <Link href="/login">
                  <User />
                </Link>
              </span>
            </div>
          ) : (
            <div className="tp-header-login-icon">
              {!userData?.profile_image?.url && (
                <span>
                  <Link href="/profile">
                    <User />
                  </Link>
                </span>
              )}
              {userData?.profile_image?.url && (
                <span>
                  <Link href="/profile">
                    <img
                      src={userData?.profile_image?.url}
                      alt="user img"
                      width={45}
                      height={45}
                    />
                  </Link>
                </span>
              )}
            </div>
          )}
          <div className="tp-header-login-content d-none d-xl-block">
            {!userData?.name && (
              <Link href="/login">
                <span>{t("Hello")},</span>
              </Link>
            )}
            {userData?.name && (
              <span>
                {t("Hello")}, {userData?.name}
              </span>
            )}
            <div className="tp-header-login-title mb-1">
              {userData?.name && (
                <Link href="/profile">{t("Your Account")}</Link>
              )}
            </div>
            <div className="tp-header-login-title">
              {!isToken ? (
                <Link href="/login">{t("Sign In")}</Link>
              ) : (
                <button className="" onClick={handleLogout}>
                  {t("Logout")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="tp-header-action d-flex align-items-center">
        <div className="tp-header-action-item d-none d-lg-block">
          <Link
            href={!authChecked ? "/login" : "/wishlist"}
            className="tp-header-action-btn"
          >
            <Wishlist />
            <span className="tp-header-action-badge">{wishlist.length}</span>
          </Link>
        </div>
        <div className="tp-header-action-item">
          <button
            onClick={handleCartButtonClick}
            type="button"
            className="tp-header-action-btn cartmini-open-btn"
          >
            <CartTwo />
            <span className="tp-header-action-badge">{totalCount}</span>
          </button>
        </div>
        <div className="tp-header-action-item d-lg-none">
          <button
            onClick={() => setIsCanvasOpen(true)}
            type="button"
            className="tp-header-action-btn tp-offcanvas-open-btn"
          >
            <Menu />
          </button>
        </div>
      </div>
      {showPopup && (
        <ConfirmationPopup
          isOpen={showPopup}
          message={t("Are you sure you want to logout") + "?"}
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </div>
  );
};

export default HeaderMainRight;