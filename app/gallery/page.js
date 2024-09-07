"use client";
import { useState } from "react";
import styles from "../styles/gallery.module.css";
import GalleryItem from "./GalleryItem";

export default function Gallery() {
  const [products, setProducts] = useState([
    // {
    //   img: "/mockup.png",
    //   price: "--",
    //   name: "coming soon",
    //   link: "/",
    // },
    {
      img: "/mockup.png",
      hoverImg: "/mockup.png",
      price: 49.95,
      name: "paramount hoodie",
      link: "/",
    },

    {
      img: "/shirt/basictwogirlsfront.png",
      hoverImg: "/shirt/basictwogirlsback.png",
      price: 29.95,
      name: "doppelgänger shirt",
      link: "/",
    },
  ]);

  return (
    <div>
      <div className={styles.header}>
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
        <p onClick={() => (window.location = "/")}>kynzono</p>
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
      <div className={styles.galleryItemContainer}>
        {products.map((item, index) => {
          return (
            <GalleryItem
              key={index}
              imgSrc={item.img}
              hoverImg={item.hoverImg}
              price={item.price}
              name={item.name}
              collection={index}
            />
          );
        })}
      </div>
    </div>
  );
}
