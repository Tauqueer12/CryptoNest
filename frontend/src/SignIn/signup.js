import "./signup.css";
import logo from "./logo.png";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Model(props) {
  const { scene } = useGLTF("/ethereum/scene.gltf");

  // Add a rotation animation to the model using useFrame hook
  useFrame(({ clock }) => {
    scene.rotation.y = Math.sin(clock.getElapsedTime() * 1) * 0.3;
  });

  return <primitive object={scene} {...props} />;
}
const Signup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    fetch("https://cryptonest-api.onrender.com/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        // Add parameters here
        first_name: firstname,
        last_name: lastname,
        email: email,
    try {
      const response = await fetch("https://cryptonest-api.onrender.com/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          // Add parameters here
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok || data.success) {
        const userData = data.data;
        localStorage.setItem("token", userData.token);
        window.localStorage.setItem("userId", userData.userId);
        window.localStorage.setItem("email", userData.email);
        window.localStorage.setItem("first_name", userData.first_name);
        window.localStorage.setItem("last_name", userData.last_name);
        toast.success("Signup Successfull");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        const errorMessage = data.message || data.error || "Signup Failed. Email may be in use.";
        console.error(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Network error. Is the server running?");
      setTimeout(() => {
        window.location.href = "/signup";
      }, 2000);
    }
  };
  return (
    <div className="Login_PAGE flex flex-row bg-[#2f2f2f] h-[100%]">
      <ToastContainer />

      <div className="a3d-model w-[50%]">
        {/* rotate the 3d model */}
        <Canvas
          dpr={[1, 2]}
          camera={{ fav: 45 }}
          style={{
            position: "relative",
            backgroundColor: "black",
            height: "100vh",
          }}
        >
          <PresentationControls
            speed={1.5}
            global
            zoom={0.2}
            polar={[-0.1, Math.PI / 4]}
          >
            <Stage environment={null}>
              <Model scale={0.005} />
            </Stage>
          </PresentationControls>
        </Canvas>

      </div>

      <div className="form-container w-[50%] flex flex-col justify-center">
        <div className="form-body w-[80%] md:w-[80%] lg:w-[60%] md:m-auto m-[5%]">
          <div className="form-header">
            <h1 className="text-5xl p-5 font-bold text-white">Sign Up</h1>
          </div>

          <form onSubmit={onSubmitHandler}>
            <div className="form-input">
              <input
                placeholder="first name"
                type="text"
                onChange={(e) => setfirstname(e.target.value)}
                value={firstname}
                name="first_name"
                className="firstname m-5 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />
              <input
                placeholder="last name"
                type="text"
                onChange={(e) => setlastname(e.target.value)}
                value={lastname}
                name="last_name"
                className="lastname m-5 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />
              <input
                placeholder="email"
                type="email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                name="email"
                className="email m-5 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />
              <input
                placeholder="password"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                name="password"
                className="password m-5 "
                required
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#454343",
                }}
              />
            </div>
            <div className="form-button">
              <button
                type="submit"
                className="login-button m-5"
                style={{
                  width: "100%",
                  height: "50px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#0CB1CA",
                }}
              >
                Sign up
              </button>
            </div>
          </form>
          <div style={{ textAlign: "center", color: "white" }}>
            Already have an account ?{" "}
            <a href="/login">
              <strong style={{ color: "#0CB1CA" }}>Login here</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;