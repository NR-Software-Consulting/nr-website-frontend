import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Menus from "./header-com/menus";
import useSticky from "@/hooks/use-sticky";
import logo from "@assets/img/logo/headerlogo.png";
import OffCanvas from "@/components/common/off-canvas";
import { openCartMini } from "@/redux/features/cartSlice";
import HeaderCategory from "./header-com/header-category";
import HeaderMainRight from "./header-com/header-main-right";
import CartMiniSidebar from "@/components/common/cart-mini-sidebar";
import HeaderSearchForm from "@/components/forms/header-search-form";
import { CartTwo, CategoryMenu, Menu, Phone, Wishlist } from "@/svg";
import { useTranslations } from "next-intl";
import { useCart } from "@/hooks/use-cart";
import useAuthCheck from "@/hooks/use-auth-check";
import Marquee from "react-fast-marquee";

const Header = ({ categories } = props) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const { totalCount } = useCart();
  const authChecked = useAuthCheck();
  const { sticky } = useSticky();
  const dispatch = useDispatch();
  const t = useTranslations("header");
  const toggleCategoryDropdown = () => {
    setIsCategoryActive(!isCategoryActive);
  };
  return (
    <>
      <header>
        <div className="tp-header-area p-relative z-index-11">
          <div className="tp-header-top black-bg p-relative z-index-1">
            <Marquee
              style={{
                color: "white",
                fontSize: "14px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              NR Mobile & Accessories Company is a rapidly expanding brand that
              offers its customers high-quality, and long-lasting products. Our
              aim is to enhance our customers lifestyles by providing them with
              products which they can enjoy.
            </Marquee>
          </div>
          <div className="tp-header-main tp-header-sticky">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-md-4 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        src={logo}
                        alt="logo"
                        style={{ height: 60, width: 200, objectFit: "contain" }}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-7 d-none d-lg-block">
                  <div className="tp-header-search pl-70">
                    <HeaderSearchForm categoriesList={categories} />
                  </div>
                </div>
                <div className="col-xl-4 col-lg-3 col-md-8 col-6">
                  <HeaderMainRight
                    setIsCanvasOpen={setIsCanvasOpen}
                    totalCount={totalCount}
                  />
                </div>
              </div>
            </div>
          </div>
          {/*Mobile Header */}
          <div className="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
            <div className="container">
              <div className="tp-mega-menu-wrapper p-relative">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-category tp-category-menu tp-header-category-toggle">
                      <button
                        onClick={() => toggleCategoryDropdown()}
                        className="tp-category-menu-btn tp-category-menu-toggle"
                      >
                        <span>
                          <CategoryMenu />
                        </span>
                        {t("All Categories")}
                      </button>
                      <nav className="tp-category-menu-content">
                        <HeaderCategory
                          categories={categories}
                          isCategoryActive={isCategoryActive}
                          toggleCategoryDropdown={toggleCategoryDropdown}
                        />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="main-menu menu-style-1">
                      <nav className="tp-main-menu-content">
                        <Menus />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3">
                    <div className="tp-header-contact d-flex align-items-center justify-content-end">
                      <div className="tp-header-contact-icon">
                        <span>
                          <Phone />
                        </span>
                      </div>
                      <div className="tp-header-contact-content">
                        <h5>{t("Hotline:")}</h5>
                        <p>
                          <a href="https://wa.me/+923160430485">
                            +92 316-0430485
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        id="header-sticky-2"
        className={`tp-header-sticky-area ${sticky ? "header-sticky-2" : ""}`}
      >
        <div className="container">
          <div className="tp-mega-menu-wrapper p-relative">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="logo"
                      style={{ height: 45, width: 155 }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 d-none d-md-block">
                <div className="tp-header-sticky-menu main-menu menu-style-1 d-none d-lg-block">
                  <nav id="mobile-menu">
                    <Menus />
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                  <div className="tp-header-action-item d-none d-lg-block">
                    <Link href="/wishlist" className="tp-header-action-btn">
                      <Wishlist />
                      <span className="tp-header-action-badge">
                        {authChecked ? wishlist?.length : 0}
                      </span>
                    </Link>
                  </div>
                  <div className="tp-header-action-item">
                    <button
                      onClick={() => dispatch(openCartMini())}
                      type="button"
                      className="tp-header-action-btn cartmini-open-btn"
                      aria-label="cart-icon"
                    >
                      <CartTwo />
                      <span className="tp-header-action-badge">
                        {authChecked ? totalCount : 0}
                      </span>
                    </button>
                  </div>
                  <div className="tp-header-action-item d-lg-none">
                    <button
                      onClick={() => setIsCanvasOpen(true)}
                      type="button"
                      className="tp-header-action-btn tp-offcanvas-open-btn"
                      aria-label="menu-drawer"
                    >
                      <Menu />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartMiniSidebar />
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="electronics"
        categories={categories}
      />
    </>
  );
};

export default Header;
