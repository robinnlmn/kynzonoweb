"use client";
import { useState } from "react";
import styles from "../styles/support.module.css";

export default function Support() {
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [message, setMessage] = useState(false);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      <div
        className={styles.header}
        style={{ width: "100%", marginLeft: "15px" }}
      >
        <p
          className={styles.backButton}
          onClick={() => {
            window.location = "/";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#000000"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            />
            <path
              fill="#000000"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            />
          </svg>
        </p>
        <p
          style={{ marginRight: "15px" }}
          onClick={() => (window.location = "/")}
        >
          kynzono
        </p>
        <p className={styles.cart} style={{ opacity: 0 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="17.5"
            viewBox="0 0 448 512"
          >
            <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
          </svg>
        </p>
      </div>
      <form
        className={styles.form}
        action="https://formsubmit.io/send/kynzono@gmail.com"
        method="POST"
      >
        <div>
          <label className={`${styles.label} ${name ? styles.type : ""}`}>
            name
          </label>
          <input
            type="text"
            name="name"
            required
            onChange={(e) => {
              if (e.target.value !== "") setName(true);
            }}
            onBlur={(e) => {
              if (e.target.value == "") setName(false);
            }}
          />
        </div>

        <div>
          <label className={`${styles.label} ${email ? styles.type : ""}`}>
            email
          </label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => {
              if (e.target.value !== "") setEmail(true);
            }}
            onBlur={(e) => {
              if (e.target.value == "") setEmail(false);
            }}
          />
        </div>

        <div>
          <label className={`${styles.label} ${phone ? styles.type : ""}`}>
            phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9\s()+-]*"
            required
            onChange={(e) => {
              if (e.target.value !== "") setPhone(true);
            }}
            onBlur={(e) => {
              if (e.target.value == "") setPhone(false);
            }}
          />
        </div>

        <select id="problem" name="problem" required>
          <option value="select" disabled selected>
            occasion
          </option>
          <option value="order">order</option>
          <option value="return">return</option>
          <option value="information">information</option>
          <option value="feedback">feedback</option>
          <option value="other">other</option>
        </select>

        <div>
          <label className={`${styles.label} ${message ? styles.type : ""}`}>
            message
          </label>
          <textarea
            name="message"
            required
            onChange={(e) => {
              if (e.target.value !== "") setMessage(true);
            }}
            onBlur={(e) => {
              if (e.target.value == "") setMessage(false);
            }}
          />
        </div>
        <button type="submit">
          {/* <svg
            style={{ marginTop: "5px" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            width="30px"
            height="30px"
            viewBox="0 0 56 56"
          >
            <path d="M 32.7812 52.5508 C 34.4687 52.5508 35.6640 51.0977 36.5312 48.8477 L 51.8829 8.7461 C 52.3048 7.6679 52.5626 6.7070 52.5626 5.9101 C 52.5626 4.3867 51.6016 3.4492 50.0781 3.4492 C 49.2813 3.4492 48.3203 3.6836 47.2423 4.1055 L 6.9296 19.5508 C 4.9609 20.3008 3.4374 21.4961 3.4374 23.2070 C 3.4374 25.3633 5.0780 26.0898 7.3280 26.7695 L 24.2499 31.7383 L 29.1718 48.4492 C 29.8749 50.8164 30.6015 52.5508 32.7812 52.5508 Z M 25.3046 28.1758 L 9.1328 23.2305 C 8.7577 23.1133 8.6406 23.0195 8.6406 22.8555 C 8.6406 22.6914 8.7343 22.5742 9.0859 22.4336 L 40.7733 10.4336 C 42.6484 9.7305 44.4531 8.7930 46.1874 7.9961 C 44.6406 9.2617 42.7187 10.7617 41.4296 12.0508 Z M 33.1562 47.3945 C 32.9687 47.3945 32.8749 47.2305 32.7577 46.8555 L 27.8124 30.6836 L 43.9374 14.5586 C 45.2031 13.2930 46.7733 11.3242 48.0155 9.7305 C 47.2187 11.5117 46.2812 13.3164 45.5546 15.2148 L 33.5546 46.9023 C 33.4140 47.2539 33.3202 47.3945 33.1562 47.3945 Z" />
          </svg> */}
          SEND
        </button>
      </form>
    </div>
  );
}
