/** @format */

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { setCookie } from "cookies-next";
import { SIGNUP_USER } from "@/graphql/mutation/auth";
import { useRouter } from "next/router";
import { CloseEye, OpenEye } from "@/svg";
import OtpVerification from "../login-register/otp-verify";
import { useTranslations } from "next-intl";

const schema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  taxNumber: yup.number().required("Tax Number is required"),
  crNumber: yup.number().required("CR Number is required"),
  phone: yup.string().required("Phone is required").min(7),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^\S+@\S+\.\S{2,}$/i, "Invalid Email Format"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Minimum length of 8 characters. Must contain at least one uppercase letter one lowercase letter one digit and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords does not match")
    .required("Confirm Password is required"),
});

const RegisterFormCompany = ({ formType }) => {
  const t = useTranslations("header");
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [registerUser, { loading, error }] = useMutation(SIGNUP_USER);

  const onSubmit = async (data) => {
    try {
      const response = await registerUser({
        variables: {
          input: {
            companyName: data.companyName,
            username: data.email,
            taxNumber: data.taxNumber,
            CRNumber: data.crNumber,
            phoneNumber: data.phone,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            type: formType,
          },
        },
      });
      setRegistrationSuccess(true);
      const { jwt, user, company_profile, user_profile } =
        response.data.register;

      let userData = {
        ...user,
        name: company_profile
          ? company_profile.companyName
          : user_profile.first_name,
        profile_image: user_profile
          ? user_profile.profile_image
          : company_profile.profile_image,
        company_profile: company_profile,
        user_profile: user_profile,
        jwt,
      };
      setUserData(userData);
      setEmail(data.email);
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div>
      {registrationSuccess ? (
        <OtpVerification email={email} userData={userData} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="companyName"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Company Name")} <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control border-0 bg-light shadow-none ${errors.companyName ? "is-invalid" : ""
                }`}
              id="companyName"
              placeholder={t("Enter your company name here")}
              aria-describedby="companyNameHelp"
              {...register("companyName")}
              onChangeCapture={(e) => {
                setValue(
                  "companyName",
                  e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
                );
              }}
            />
            {errors.companyName && (
              <div className="invalid-feedback">
                {errors.companyName.message}
              </div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="taxNumber"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Tax Number")} <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control border-0 bg-light shadow-none ${errors.taxNumber ? "is-invalid" : ""
                }`}
              id="taxNumber"
              placeholder={t("Enter tax number here")}
              aria-describedby="taxNumberHelp"
              {...register("taxNumber")}
              onChangeCapture={(e) => {
                setValue(
                  "taxNumber",
                  e?.currentTarget?.value
                    ?.trimStart()
                    .replace(/ +(?= )/g, "")
                    .replace(/[^\d\s]/g, "")
                );
              }}
            />
            {errors.taxNumber && (
              <div className="invalid-feedback">{"Tax Number is required"}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="crNumber"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("CR Number")} <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control border-0 bg-light shadow-none ${errors.crNumber ? "is-invalid" : ""
                }`}
              id="crNumber"
              placeholder={t("Enter your CR number here")}
              aria-describedby="crNumberHelp"
              {...register("crNumber")}
              onChangeCapture={(e) => {
                setValue(
                  "crNumber",
                  e?.currentTarget?.value
                    ?.trimStart()
                    .replace(/ +(?= )/g, "")
                    .replace(/[^\d\s]/g, "")
                );
              }}
            />
            {errors.crNumber && (
              <div className="invalid-feedback">{"CR Number is required"}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="phone"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Phone")} <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control border-0 bg-light shadow-none ${errors.phone ? "is-invalid" : ""
                }`}
              id="phone"
              placeholder={t("Enter your phone here")}
              aria-describedby="phoneHelp"
              {...register("phone")}
              onChangeCapture={(e) => {
                setValue(
                  "phone",
                  e?.currentTarget?.value
                    ?.trimStart()
                    .replace(/ +(?= )/g, "")
                    .replace(/[^\d\s+]/g, "")
                );
              }}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone.message}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="email"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Email")} <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className={`form-control border-0 bg-light shadow-none ${errors.email ? "is-invalid" : ""
                }`}
              id="email"
              placeholder={t("Enter your Email")}
              aria-describedby="emailHelp"
              {...register("email")}
              onChangeCapture={(e) => {
                setValue(
                  "email",
                  e?.currentTarget?.value?.trimStart().replace(/ +(?= )/g, "")
                );
              }}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="password"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Password")} <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type={showPass ? "text" : "password"}
                className={`form-control border-0 bg-light shadow-none ${errors.password ? "is-invalid" : ""
                  }`}
                id="password"
                placeholder={t("Enter your password here")}
                aria-describedby="passwordHelp"
                {...register("password")}
                onChangeCapture={(e) => {
                  setValue(
                    "password",
                    e?.currentTarget?.value
                      ?.trimStart()
                      .replace(/ +(?= )/g, "")
                      .trim()
                  );
                }}
              />

              <div className="tp-login-input-eye" id="password-show-toggle">
                <span
                  className="eye-icon"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <OpenEye /> : <CloseEye />}
                </span>
              </div>
            </div>
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-md-3 mb-2">
            <label
              htmlFor="confirmPassword"
              className="form-label text-black fw-semibold p-0 m-0"
            >
              {t("Confirm Password")} <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                className={`form-control border-0 bg-light shadow-none ${errors.confirmPassword ? "is-invalid" : ""
                  }`}
                id="confirmPassword"
                placeholder={t("Confirm Password")}
                aria-describedby="confirmPasswordHelp"
                {...register("confirmPassword")}
                onChangeCapture={(e) => {
                  setValue(
                    "confirmPassword",
                    e?.currentTarget?.value
                      ?.trimStart()
                      .replace(/ +(?= )/g, "")
                      .trim()
                  );
                }}
              />

              <div
                className="tp-login-input-eye"
                id="confirm-password-show-toggle"
              >
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <OpenEye /> : <CloseEye />}
                </span>
              </div>
            </div>
            {errors.confirmPassword && (
              <div className="text-danger">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )}
          <div className="d-flex flex-column justify-content-center align-items-center">
            <button
              type="submit"
              className="btn btn-primary form-control py-md-3 py-2 my-3 shadow-none bg-primary text-white"
            >
              {loading ? (
                <span>{t("loading")}...</span>
              ) : (
                <span>{t("Sign Up")}</span>
              )}
            </button>
            <p className="mt-5">
              {t("Already have an account")}?{" "}
              <span className="text-primary">
                <Link href="/login">{t("Sign In")}</Link>
              </span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterFormCompany;