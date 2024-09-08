"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/gallery.module.css";

export default function GalleryItem({
  imgSrc,
  hoverImg,
  price,
  name,
  collection,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const handleRedirect = (value) => {
    console.log(`/?${value}`);
    router.push(`/?${value}`);
  };

  return (
    <div
      className={styles.galleryItem}
      onClick={() => handleRedirect(collection)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <img
        src={imgSrc}
        alt="product Picture"
        width="80%"
        height="80%"
        className={styles.normalimg}
      />
      <img
        src={hoverImg}
        alt="product Picture 2"
        width="80%"
        height="80%"
        className={styles.hoverimg}
      />

      <div>
        <p>{name}</p>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <i>
            <p>{price}€</p>
          </i>
          {isHovered ? (
            <p style={{ color: "gray", fontSize: "12px" }}>XS S M L XL</p>
          ) : (
            <></>
          )}
        </p>
      </div>
    </div>
  );
}
