import { useState } from "react";
import React from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { auth, firestore } from "./backend.js";
import { collection, getDocs } from "@firebase/firestore";

function Login() {
  const navigate = useNavigate();

  const [email, Setemail] = useState("");
  const [pass, Setpass] = useState("");

  const handleSignIn = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        var res = "false";
        const user = userCredential.user.uid;
        const ref = collection(firestore, "Users");
        const docs = await getDocs(ref);
        docs.forEach((doc) => {
          if (doc.data().uid === user) {
            res = doc.data()["isAdmin"];
            return;
          }
        });
        if (res === "true") {
          // Save data to cache
          localStorage.setItem(
            "key",
            JSON.stringify({ con: 1, id: user, time: Date.now()})
          );
          setTimeout(() => {
            nav1();
          }, 2000);
        } else {
          localStorage.setItem("key", JSON.stringify({ con: 0, id: user, time:Date.now()}));
          setTimeout(() => {
            nav();
          }, 2000);
        }
        toast.success("Login Successful!");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(error);
        toast.error("Incorrect Credentials");
      });
  };

  const signIn = async (event) => {
    event.preventDefault();
    handleSignIn(email, pass);
  };

  const nav = () => {
    navigate("/form");
  };
  const nav1 = () => {
    navigate("/admin");
  };

  return (
    <div className='page'>
      <div className='container'>
        <h2>Login</h2>
        <form className='align' onSubmit={signIn}>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(event) => {
              Setemail(event.target.value);
            }}
          />
          <input
            type='password'
            placeholder='Password'
            value={pass}
            onChange={(event) => {
              Setpass(event.target.value);
            }}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
