import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import { CloseTwo } from "@/svg";
import logo from "@assets/img/logo/headerlogo.png";
import contact_img from "@assets/img/icon/contact.png";
import language_img from "@assets/img/icon/language-flag.png";
import MobileCategory from "@/layout/headers/header-com/mobile-category";
import MobileMenus from "./mobile-menus";
import { useTranslations } from "next-intl";
import HeaderCategory from "@/layout/headers/header-com/header-category";

const OffCanvas = ({
  isOffCanvasOpen,
  setIsCanvasOpen,
  categoryType = "electronics",
  categories,
}) => {
  const t = useTranslations("header");
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isCurrencyActive, setIsCurrencyActive] = useState(false);
  const [isLanguageActive, setIsLanguageActive] = useState(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryActive(!isCategoryActive);
  };
  // handle language active
  const handleLanguageActive = () => {
    setIsLanguageActive(!isLanguageActive);
    setIsCurrencyActive(false);
  };
  // handle Currency active
  const handleCurrencyActive = () => {
    setIsCurrencyActive(!isCurrencyActive);
    setIsLanguageActive(false);
  };
  return (
    <>
      <div
        className={`offcanvas__area offcanvas__radius ${isOffCanvasOpen ? "offcanvas-opened" : ""
          }`}
      >
        <div className="offcanvas__wrapper">
          <div className="offcanvas__close">
            <button
              onClick={() => setIsCanvasOpen(false)}
              className="offcanvas__close-btn offcanvas-close-btn"
            >
              <CloseTwo />
            </button>
          </div>
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-70 d-flex justify-content-between align-items-center">
              <div className="offcanvas__logo logo">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="logo"
                    style={{ height: 45, width: 155 }}
                  />
                </Link>
              </div>
            </div>
            <div className="offcanvas__category pb-20">
              <button
                onClick={() => setIsCategoryActive(!isCategoryActive)}
                className="tp-offcanvas-category-toggle"
              >
                <i className="fa-solid fa-bars"></i>
                {t("All Categories")}
              </button>
              <div className="tp-category-mobile-menu">
                <nav
                  className={`tp-category-menu-content ${
                    isCategoryActive ? "active" : ""
                  }`}
                >
                {/* <MobileCategory
                    categoryType={categoryType}
                    isCategoryActive={isCategoryActive}
                  /> */}
                <HeaderCategory
                  categories={categories}
                  isCategoryActive={isCategoryActive}
                  toggleCategoryDropdown={toggleCategoryDropdown}
                />
                </nav>
              </div>
            </div>
            <div className="tp-main-menu-mobile fix d-lg-none mb-40">
              <MobileMenus />
            </div>
          </div>
          {/*<div className="offcanvas__bottom">
            <div className="offcanvas__footer d-flex align-items-center justify-content-between">
              <div className="offcanvas__currency-wrapper currency">
                <span
                  onClick={handleCurrencyActive}
                  className="offcanvas__currency-selected-currency tp-currency-toggle"
                  id="tp-offcanvas-currency-toggle"
                >
                  Currency : USD
                </span>
                <ul
                  className={`offcanvas__currency-list tp-currency-list ${
                    isCurrencyActive ? "tp-currency-list-open" : ""
                  }`}
                >
                  <li>USD</li>
                  <li>ERU</li>
                  <li>BDT </li>
                  <li>INR</li>
                </ul>
              </div>
              <div className="offcanvas__select language">
                <div className="offcanvas__lang d-flex align-items-center justify-content-md-end">
                  <div className="offcanvas__lang-img mr-15">
                    <Image src={language_img} alt="language-flag" />
                  </div>
                  <div className="offcanvas__lang-wrapper">
                    <span
                      onClick={handleLanguageActive}
                      className="offcanvas__lang-selected-lang tp-lang-toggle"
                      id="tp-offcanvas-lang-toggle"
                    >
                      English
                    </span>
                    <ul
                      className={`offcanvas__lang-list tp-lang-list ${
                        isLanguageActive ? "tp-lang-list-open" : ""
                      }`}
                    >
                      <li>Spanish</li>
                      <li>Portugese</li>
                      <li>American</li>
                      <li>Canada</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* body overlay start */}
      <div
        onClick={() => setIsCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
      {/* body overlay end */}
    </>
  );
};

export default OffCanvas;
