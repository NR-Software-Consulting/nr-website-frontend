/** @format */

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { useTranslations } from "next-intl";
import useAuthCheck from "@/hooks/use-auth-check";

// language
function Language({ active, handleActive }) {
  const t = useTranslations("header");
  const route = useRouter();
  const authChecked = useAuthCheck();
  return (
    <div className='tp-header-top-menu-item tp-header-lang'>
      <span
        onClick={() => handleActive("lang")}
        className='tp-header-lang-toggle'
        id='tp-header-lang-toggle'>
        {route.locale == "ar" ? "عربي" : "English"}
      </span>
      <ul className={active === "lang" ? "tp-lang-list-open" : ""}>
        {route.locale == "ar" ? (
          <li>
            <a href={`/en${route.asPath}`}>{t("English")}</a>
          </li>
        ) : (
          <li>
            <a href={`/ar${route.asPath}`}>{t("Arabic")}</a>
          </li>
        )}
      </ul>
    </div>
  );
}

// currency
// function Currency({ active, handleActive }) {
//   return (
//     <div className="tp-header-top-menu-item tp-header-currency">
//       <span
//         onClick={() => handleActive("currency")}
//         className="tp-header-currency-toggle"
//         id="tp-header-currency-toggle"
//       >
//         USD
//       </span>
//       <ul className={active === "currency" ? "tp-currency-list-open" : ""}>
//         <li>
//           <a href="#">EUR</a>
//         </li>
//         <li>
//           <a href="#">CHF</a>
//         </li>
//         <li>
//           <a href="#">GBP</a>
//         </li>
//         <li>
//           <a href="#">KWD</a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// setting
function ProfileSetting({ active, handleActive }) {
  const t = useTranslations("header");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const authChecked = useAuthCheck();
  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push("/");
  };
  return (
    <div className='tp-header-top-menu-item tp-header-setting'>
      <span
        onClick={() => handleActive("setting")}
        className='tp-header-setting-toggle'
        id='tp-header-setting-toggle'>
        {t("Setting")}
      </span>
      <ul className={active === "setting" ? "tp-setting-list-open" : ""}>
        <li>
          <Link href='/profile'>{t("My Profile")}</Link>
        </li>
        <li>
          <Link href={!authChecked ? "/login" : "/wishlist"}>
            {t("Wishlist")}
          </Link>
        </li>
        <li>
          <Link href={!authChecked ? "/login" : "/cart"}>{t("Cart")}</Link>
        </li>
        <li>
          {!user?.name && (
            <Link href='/login' className='cursor-pointer'>
              {t("Login")}
            </Link>
          )}
          {user?.name && (
            <a onClick={handleLogout} className='cursor-pointer'>
              {t("Logout")}
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

const HeaderTopRight = () => {
  const [active, setIsActive] = useState("");
  // handle active
  const handleActive = (type) => {
    if (type === active) {
      setIsActive("");
    } else {
      setIsActive(type);
    }
  };
  return (
    <div className='tp-header-top-menu d-flex align-items-center justify-content-end'>
      <Language active={active} handleActive={handleActive} />
      <ProfileSetting active={active} handleActive={handleActive} />
    </div>
  );
};

export default HeaderTopRight;
