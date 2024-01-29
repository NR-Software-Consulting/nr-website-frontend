import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

const DetailsBottomInfo = ({ category, SubCategory, brand, productLink }) => {
  const t = useTranslations("header");
  const router = useRouter();
  const shareUrl = "https://nrmobiles.com" + `${router.asPath}`;
  return (
    <>
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("Category")}: </span>
          <p>{category}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{"Sub Category"}: </span>
          <p>{SubCategory}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>{t("Brand")}: </span>
          {brand ? <p>{brand}</p> : "Not A Specific Brand"}
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Note:</span>
          <p>Your Product will be deliverd in 3-4 Bussiness Days</p>
        </div>
        {productLink ? (
          <div className="tp-product-details-query-item d-flex align-items-center">
            <span>For Product Review:</span>
            <a href={productLink} target="blank">
              <img
                src="/youtube.svg"
                alt="Youtube svg"
                style={{ height: "25px", width: "25px", paddingRight: "5px" }}
              />
              Click Here Product Review
            </a>
          </div>
        ) : null}
      </div>
      <div className="tp-product-details-social">
        <span>Share: </span>
        <FacebookShareButton url={shareUrl}>
          <Link href={shareUrl} target="_blank" aria-label="Facebook">
            <i className="fa-brands fa-facebook-f" />
          </Link>
        </FacebookShareButton>
        <WhatsappShareButton url={shareUrl}>
          <Link href={shareUrl} target="blank" aria-label="whatsapp">
            <i className="fa-brands fa-whatsapp" />
          </Link>
        </WhatsappShareButton>
        {/*
        <LinkedinShareButton url={shareUrl}>
          <Link href={shareUrl} target="_blank" aria-label="instagram">
            <i className="fa-brands fa-instagram" />
          </Link>
        </LinkedinShareButton>
        */}
      </div>
    </>
  );
};

export default DetailsBottomInfo;
