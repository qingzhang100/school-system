import React, { useState } from "react";
import generalStyles from "../../generalStyles.module.css";
import styles from "./Login.module.css";

import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-removebg-preview.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("");
  const navigate = useNavigate();

  //show supabase client
  console.log(supabase);

  const [loginRole, setLoginRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
    // localstorage
    localStorage.setItem("role", loginRole);
  };

  return (
    <main className={styles.homepage}>
      <div className={styles.bg}></div>

      <section className={styles.loginSection}>
        <div className={styles.loginHeader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div className={styles.welcome}>Welcome Back!</div>
        </div>

        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={styles.loginFormItem}>
            <label className={styles.loginFormLabel} htmlFor="loginAs">
              Login As
            </label>
            <select
              className={styles.loginFormInput}
              value={loginAs}
              onChange={(e) => setLoginAs(e.target.value)}
              required
            >
              <option value="Administrator">Administrator</option>
              <option value="Advisor">Advisor</option>
              <option value="Student">Student</option>
            </select>
          </div>

          <div className={styles.loginFormItem}>
            <label className={styles.loginFormLabel} htmlFor="username">
              Username:
            </label>
            <input
              className={styles.loginFormInput}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.loginFormItem}>
            <label className={styles.loginFormLabel} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.loginFormInput}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={`${styles.loginFormItem} ${styles.loginHint}`}>
            <div className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
            <Link className={generalStyles.link}>Forgot password</Link>
          </div>

          <div className={styles.loginFormItem}>
            <Button colorType="rose">Login</Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
