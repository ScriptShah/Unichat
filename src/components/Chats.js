import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Chats = () => {
  const history = useNavigate();

  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    history("/");
  };

  useEffect(() => {
    if (!user) {
      history("/");
      return;
    }

    const getFile = async (url) => {
      const response = await fetch(url);
      const data = await response.blob();

      return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
    };

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "8bfdc7a3-ddd3-4efa-881f-6d9ac03387fc",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": "85a934e1-28db-478a-be65-552cb057ae31",
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">EChat</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calce(100vh - 66px)"
        projectID="8bfdc7a3-ddd3-4efa-881f-6d9ac03387fc"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
