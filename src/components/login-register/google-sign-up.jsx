import React from "react";
import Image from "next/image";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import google_icon from "@assets/img/icon/login/google.svg";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useMutation } from "@apollo/client";
import { GOOGLE_LOGIN } from "@/graphql/mutation/auth";

const GoogleSignUp = () => {
  const [googleLogin, { loading, error }] = useMutation(GOOGLE_LOGIN);
  const router = useRouter();
  const { redirect } = router.query;
  const handleGoogleSignIn = async (user) => {
    if (user) {
      try {
        const response = await googleLogin({
          variables: {
            input: {
              id_token: user.credential.idToken,
            },
          },
        });
        const res = response.data.googleLogin;
        if (res) {
          notifySuccess("Login success!");
          router.push(redirect || "/");
        } else {
          console.log("result error -->", res.error);
          notifyError(res.error?.message);
        }
      } catch (err) {
        console.error("Error during Google login:", err);
        notifyError(err?.message || "Something went wrong during login.");
      }
    }
  };

  return (
    <div>
      <GoogleLogin
        render={(renderProps) => (
          <a
            className="cursor-pointer"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <span className="d-flex justify-content-center align-items-center w-100">
              <Image src={google_icon} alt="google_icon" />
              <span className="ms-2">Sign in with Google</span>
            </span>
          </a>
        )}

        onSuccess={() => {
        }}
        onFailure={(err) =>
          notifyError(err?.message || "Something went wrong with login.")
        }
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleSignUp;
