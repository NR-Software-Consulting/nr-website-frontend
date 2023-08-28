import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const AboutPage = (props) => {
  const t = useTranslations("header");
  return (
    <div className="container pt-100">
      <div className="text-center">
        <p className="text-heading">{t("Get to know us Better")}</p>
      </div>
      <div className="text-center">
        <p className="p-about">{t("About Company")}</p>
      </div>
      {/* <p>{aboutUsContent}</p>  */}
      <div className="d-flex mt-80 col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="left-side col-xs-12 col-sm-12 col-md-6 col-lg-5">
            <div>
              <p className="text-size">{props?.attributes?.title}</p>
            </div>
            <div>
              <p className="text-size-p mt-35">
                {[props?.attributes?.description.slice(0, 187)]}
              </p>
            </div>
            <div className="d-flex mt-35 align-items-center">
              <p className="text-size-link mb-0">
                <Link href="/about">{t("Read More")}</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M10.0758 8.22704L17.5004 8.22704M17.5004 8.22704L17.5004 15.6517M17.5004 8.22704L7.9545 17.773"
                    stroke="#175CFF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <img
              src={props?.attributes?.image?.data?.attributes?.url}
              alt="About Image"
              style={{ height: "399px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
