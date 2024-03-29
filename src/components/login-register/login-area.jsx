import React from "react";
import LoginForm from "../forms/login-form";
import LoginShapes from "./login-shapes";
import GoogleSignUp from "./google-sign-up";
import { useTranslations } from "next-intl";

const LoginArea = () => {
  const t = useTranslations("header");
  return (
    <>
      <section className="tp-login-area pb-100 pt-100 p-relative z-index-1 fix">
        <LoginShapes />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="tp-login-wrapper rounded-3">
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title fw-bolder">{t("Login")}</h3>
                  <p>{t("Login to your account to view products")}</p>
                </div>
                <div className="tp-login-option">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginArea;
