import React from "react";
import { MainBtn } from "../global_styles/button";
import { Base } from "../util/base";
import { Header2 } from "../global_styles/typography";

const Login = () => {
  return (
    <div style={{ width: "500px" }} className="ml-auto mr-auto mt-4">
      <div>
        <Header2>Login</Header2>
        <MainBtn
          className="mt-4"
          onClick={() => {
            window.location.href = `${Base}/auth/cas`;
          }}
          primary
        >
          Login with CAS
        </MainBtn>
      </div>
    </div>
  );
};

export default Login;
