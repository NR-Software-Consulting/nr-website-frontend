import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const DetailsBottomInfo = ({ sku, category, tag }) => {
  const t = useTranslations("header");
  const router = useRouter();
  const shareUrl =
    process.env.NEXT_PUBLIC_SITE_URL + `/${router.locale + router.asPath}`;

  return (
    <>
      {/* product-details-query */}
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("SKU")}: </span>
          <p>{sku}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("Category")}: </span>
          <p>{category}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("Tag")}: </span>
          <p>{tag}</p>
        </div>
      </div>

      {/*  product-details-social*/}

      <div className="tp-product-details-social">
        <span>{t("Share")}: </span>
        <a href={shareUrl}>
          <FacebookShareButton url={shareUrl}>
            <i className="fa-brands fa-facebook-f"></i>
          </FacebookShareButton>
        </a>
        <a url={shareUrl}>
          <TwitterShareButton url={shareUrl}>
            <i className="fa-brands fa-twitter"></i>
          </TwitterShareButton>
        </a>
        <a url={shareUrl}>
          <LinkedinShareButton url={shareUrl}>
            <i className="fa-brands fa-linkedin-in"></i>
          </LinkedinShareButton>
        </a>
        {/*        <a url={shareUrl}>
          <i className="fa-brands fa-vimeo-v"></i>
        </a> */}
      </div>

      {/* product-details-msg */}

      <div className="tp-product-details-msg mb-15">
        <ul>
          <li>{t("30 days easy returns")}</li>
          <li>{t("Order yours before 230pm for same day dispatch")}</li>
        </ul>
      </div>
    </>
  );
};

export default DetailsBottomInfo;
