import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { auth } from "../firebase";
import { signInWithRedirect } from "firebase/auth"; // Import signInWithRedirect

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to Unichat!</h2>
        <div
          className="login-button google"
          onClick={() =>
            signInWithRedirect(auth, new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign In with Google
        </div>
        <br />
        <br />
        <div
          className="login-button facebook"
          onClick={() =>
            signInWithRedirect(auth, new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined /> Sign In with Facebook {/* Fix the typo */}
        </div>
      </div>
    </div>
  );
};

export default Login;
