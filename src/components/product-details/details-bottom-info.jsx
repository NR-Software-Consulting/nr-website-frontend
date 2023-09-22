import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const DetailsBottomInfo = ({ category, tag, brand }) => {
  const t = useTranslations("header");
  const router = useRouter();
  const shareUrl =
    process.env.NEXT_PUBLIC_SITE_URL + `/${router.locale + router.asPath}`;

  return (
    <>
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("Category")}: </span>
          <p>{category}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("Tag")}: </span>
          <p>{tag}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("Brand")}: </span>
          <p>{brand}</p>
        </div>
      </div>
    </>
  );
};

export default DetailsBottomInfo;
