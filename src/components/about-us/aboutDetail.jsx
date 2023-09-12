import useLoadingState from "@/hooks/use-loading";
import { useTranslations } from "next-intl";
import React from "react";
import SearchPrdLoader from "../loader/search-prd-loader";

const AboutDetail = (props) => {
  const t = useTranslations("header");
  const loading = useLoadingState();
  return (
    <>
      {loading ? (
        <div><SearchPrdLoader /></div>
      ) : (
        <div className="container pt-50 pb-50">
          <div className="d-flex col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <img
                  src={props?.attributes?.image?.data?.attributes?.url}
                  alt="About Image"
                  quality={100}
                  style={{ height: "50vh", width: "100%" }}
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="mt-30 text-center">
                  <div>
                    <p className="text-heading">{t("Get to know us Better")}</p>
                  </div>
                  <div>
                    <h5 className="p-about">{t("About Company")}</h5>
                  </div>
                </div>
                <div className="mt-30">
                  <h5 className="text-size mt-20" style={{ direction: "ltr" }}>{props?.attributes?.title}</h5>
                  <p className="mt-20" style={{ direction: "ltr" }}>{props?.attributes?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutDetail;
