"use client";
import styles from "./styles/page.module.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserView, MobileView } from "react-device-detect";
import { useRouter } from "next/navigation";

export default function Home() {
  const [images, setImages] = useState([
    {
      name: "paramount drop",
      images: [
        {
          src: "/3dhoodie.mp4",
          cartSrc: "/3dhoodiesquare.mp4",
          cart: "paramount hoodie",
          variants: [
            "47629165035859",
            "47629165068627",
            "47629165101395",
            "47629165134163",
            "47629165166931",
          ],
          price: 49.95,
        },
      ],
    },

    {
      name: "doppelgänger shirt",
      images: [
        {
          src: "/3dshirt.mp4",
          cartSrc: "/shirt/basictwogirlsfront.png",
          cart: "doppelgänger shirt",
          variants: [
            "49283577282899",
            "49283577315667",
            "49283577348435",
            "49283577381203",
            "49283577413971",
          ],
          price: 29.95,
        },
      ],
    },
  ]);
  const [currentCollection, setCurrentCollection] = useState(0);
  const [isClicked, setIsClicked] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [isAddToCartOpen, setIsAddToCartOpen] = useState(false);
  const [alreadyOpened, setAlreadyOpened] = useState(false);
  const [currentAddToCart, setCurrentAddToCart] = useState(0);
  const [currentCart, setCurrentCart] = useState([]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [productInformationOpen, setProductInformationOpen] = useState(false);
  const [earlyCode, setEarlyCode] = useState("");

  const videoUrl = images[currentCollection].images[0].src;

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setTimeLeft(calculateTimeLeft());
    // }, 1000);
    // return () => clearTimeout(timer);

    let value = window.location.search;
    if (value.charAt(0) === "?") {
      value = value.substring(1);
    }

    if (value) {
      setCurrentCollection(parseInt(value));
    } else {
      setCurrentCollection(1);
    }
  }, []);

  function calculateTimeLeft() {
    const difference = +new Date("2024-09-08T18:00:00") - +new Date();
    // const difference = +new Date("2024-03-14T15:09:30") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  function burgerMenuClicked() {
    setIsAddToCartOpen(false);

    if (!isCartOpen) {
      const details = document.getElementById("details");

      setIsMenuOpen(!isMenuOpen);

      setAlreadyOpened(true);
      setTimeout(() => {
        details.open = false;
      }, 1000);
      return;
    }

    setisCartOpen(false);
    setTimeout(() => {
      const details = document.getElementById("details");

      setIsMenuOpen(!isMenuOpen);

      setAlreadyOpened(true);
      setTimeout(() => {
        details.open = false;
      }, 1000);
    }, 500);
  }

  function toggleScreen() {
    setIsClicked(true);

    const shopNowButton = document.getElementById("shopNowButton");
    const content = document.querySelector(`.${styles.container}`);
    content.classList.toggle(styles.hiddenContent);

    setTimeout(() => {
      shopNowButton.classList.toggle(styles.hiddenContent);
    }, 1500);
  }

  function handleAddToCart() {
    if (currentCart.length >= 5) return;
    const select = document.getElementById("sizeSelect");
    var variant;

    if (select.value == "") return;

    const newItem = {
      img: "",
      name: "",
      size: "",
      link: "",
      price: 0,
    };

    if (select.value == "XS") variant = 0;
    if (select.value == "S") variant = 1;
    if (select.value == "M") variant = 2;
    if (select.value == "L") variant = 3;
    if (select.value == "XL") variant = 4;

    newItem.size = select.value;
    newItem.name = images[currentCollection].images[0].cart;
    newItem.img = images[currentCollection].images[0].cartSrc;
    newItem.link = images[currentCollection].images[0].variants[variant];
    newItem.price = images[currentCollection].images[0].price;

    console.log(newItem);

    setCurrentCart((prevCart) => [...prevCart, newItem]);

    setIsAddToCartOpen(false);

    const animationOptions = {
      elementId: "cart",
      duration: 400,
      bounceHeight: 10,
      iterations: 2,
      easing: "ease-out",
    };

    if (!isCartOpen) cartAnimation(animationOptions);
    handleLocalstorage(newItem);
    cartChange();
  }

  function handleLocalstorage(newItem) {
    localStorage.setItem("cart", JSON.stringify([...currentCart, newItem]));
  }

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    setCurrentCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  function handleCheckout() {
    var checkoutLink = "";
    currentCart.map((cart, index) => {
      console.log(index);
      if (index == 0) {
        checkoutLink = checkoutLink.concat("/" + cart.link + ":1");
      } else {
        checkoutLink = checkoutLink.concat("," + cart.link + ":1");
      }
    });

    var finalLink = "https://checkout.kynzono.com/cart";

    finalLink = finalLink.concat(checkoutLink);

    console.log(finalLink);
    window.location = finalLink;
  }

  function handleCartItemRemove(index) {
    setTimeout(() => {
      const newArray = [...currentCart];
      newArray.splice(index, 1);
      setCurrentCart(newArray);
      localStorage.setItem("cart", JSON.stringify(newArray));
    }, 1000);

    const cartItem = document.getElementById(`cartItem-${index}`);
    cartItem.classList.toggle(styles.fadeAnimation);
    cartChange();
  }

  function cartAnimation(options = {}) {
    const {
      elementId = "cart",
      duration = 500,
      bounceHeight = 20,
      iterations = 1,
      easing = "ease-in-out",
    } = options;

    const cartItem = document.getElementById(elementId);

    if (!cartItem) {
      console.error(`Element with ID "${elementId}" not found.`);
      return;
    }

    const keyframes = [
      { transform: "translateY(0)" },
      { transform: `translateY(-${bounceHeight}px)` },
      { transform: "translateY(0)" },
    ];

    const animationOptions = {
      duration,
      iterations,
      easing,
    };

    const animation = cartItem.animate(keyframes, animationOptions);

    animation.addEventListener("finish", () => {
      cartItem.style.transform = "translateY(0)";
    });
  }

  useLayoutEffect(() => {
    var video = document.querySelector("video");
    if (!video) return;
    video.muted = true;
    video.play();
  }, []);

  function calculateCartPrice() {
    return currentCart
      .reduce((total, item) => total + item.price, 0)
      .toFixed(2);
  }

  return (
    <main className={styles.main}>
      <div
        className={`${styles.menuContainer} ${
          isMenuOpen ? styles.menuOpen : ""
        }`}
      >
        <div>
          <a
            className={`${styles.menuText1} ${
              alreadyOpened ? styles.menuOpenText : ""
            } ${styles.menuText}`}
          >
            <details id="details">
              <summary>collection</summary>
              <p
                onClick={() => {
                  burgerMenuClicked();
                  setCurrentCollection(1);
                  window.location = "/?1";
                }}
                className={styles.detailsp}
              >
                doppelgänger drop
              </p>
              <p
                onClick={() => {
                  burgerMenuClicked();
                  setCurrentCollection(0);
                  window.location = "/?0";
                }}
                className={styles.detailsp}
              >
                paramount drop
              </p>
              <p
                onClick={() => {
                  // burgerMenuClicked();
                  window.location = "https://checkout.kynzono.com";
                }}
                className={styles.detailsp}
              >
                next drop
              </p>
            </details>
          </a>
          <a
            className={`${styles.menuText2} ${
              alreadyOpened ? styles.menuOpenText : ""
            } ${styles.menuText}`}
            href="/gallery"
          >
            gallery
          </a>
          <br></br>
          <a
            className={`${styles.menuText3} ${
              alreadyOpened ? styles.menuOpenText : ""
            } ${styles.menuText}`}
            href="/support"
          >
            support
          </a>
          <a
            className={`${styles.menuText4} ${
              alreadyOpened ? styles.menuOpenText : ""
            } ${styles.menuText}`}
            href="/legal"
          >
            legal
          </a>
        </div>
        <div className={styles.socials}>
          <a
            href="https://www.tiktok.com/@kynzono"
            className={styles.social}
            data-tiktok="true"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 18"
            >
              <path
                d="M8.02 0H11s-.17 3.82 4.13 4.1v2.95s-2.3.14-4.13-1.26l.03 6.1a5.52 5.52 0 11-5.51-5.52h.77V9.4a2.5 2.5 0 101.76 2.4L8.02 0z"
                fill="black"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/kynzono/"
            className={styles.social}
          >
            <svg aria-hidden="true" focusable="false" viewBox="0 0 18 18">
              <path
                fill="black"
                d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"
              ></path>
              <path
                fill="black"
                d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"
              ></path>
            </svg>
          </a>
          <a href="https://www.youtube.com/@kynzono" className={styles.social}>
            <svg
              height="64px"
              width="64px"
              viewBox="0 0 461.001 461.001"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    // style="fill:#000000;"
                    d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </a>

          <a
            href="https://www.pinterest.com/kynzono/"
            className={styles.social}
          >
            <svg
              fill="#000000"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>pinterest</title>{" "}
                <path d="M16.021 1.004c-0 0-0.001 0-0.002 0-8.273 0-14.979 6.706-14.979 14.979 0 6.308 3.899 11.705 9.419 13.913l0.101 0.036c-0.087-0.595-0.137-1.281-0.137-1.979 0-0.819 0.068-1.622 0.2-2.403l-0.012 0.084c0.274-1.171 1.757-7.444 1.757-7.444-0.284-0.636-0.449-1.379-0.449-2.16 0-0.023 0-0.046 0-0.069l-0 0.004c0-2.078 1.208-3.638 2.709-3.638 0.008-0 0.018-0 0.028-0 1.040 0 1.883 0.843 1.883 1.883 0 0.080-0.005 0.159-0.015 0.236l0.001-0.009c-0.307 1.903-0.738 3.583-1.304 5.199l0.064-0.21c-0.042 0.161-0.067 0.345-0.067 0.535 0 1.2 0.973 2.173 2.173 2.173 0.039 0 0.078-0.001 0.117-0.003l-0.005 0c2.659 0 4.709-2.805 4.709-6.857 0.002-0.054 0.003-0.118 0.003-0.182 0-3.265-2.647-5.913-5.913-5.913-0.123 0-0.244 0.004-0.365 0.011l0.017-0.001c-0.083-0.004-0.18-0.006-0.277-0.006-3.58 0-6.482 2.902-6.482 6.482 0 0.007 0 0.014 0 0.022v-0.001c0 0 0 0.001 0 0.001 0 1.287 0.417 2.476 1.122 3.441l-0.011-0.016c0.076 0.081 0.122 0.191 0.122 0.311 0 0.043-0.006 0.084-0.017 0.123l0.001-0.003c-0.112 0.469-0.366 1.498-0.417 1.703-0.066 0.281-0.215 0.339-0.501 0.206-1.843-1.214-3.043-3.274-3.043-5.614 0-0.068 0.001-0.135 0.003-0.202l-0 0.010c0-4.719 3.434-9.062 9.897-9.062 0.132-0.007 0.287-0.011 0.442-0.011 4.811 0 8.72 3.862 8.795 8.655l0 0.007c0 5.167-3.258 9.325-7.789 9.325-0.039 0.001-0.086 0.002-0.132 0.002-1.366 0-2.573-0.677-3.306-1.713l-0.008-0.013-0.936 3.559c-0.488 1.499-1.123 2.8-1.91 3.992l0.038-0.061c1.325 0.425 2.85 0.671 4.432 0.671 8.274 0 14.981-6.707 14.981-14.981 0-8.272-6.705-14.978-14.977-14.981h-0z"></path>{" "}
              </g>
            </svg>
          </a>
        </div>
      </div>
      <div
        className={`${styles.cartContainer} ${
          isCartOpen ? styles.cartOpen : ""
        }`}
      >
        <div className={styles.cartContent}>
          {currentCart.length > 0 ? (
            currentCart.map((item, index) => {
              return (
                <div
                  key={index}
                  className={styles.cartItemContainer}
                  id={`cartItem-${index}`}
                >
                  {/* <img src={item.img} width={82} height={82} /> */}
                  {item.name == "paramount hoodie" ? (
                    <video
                      width={82}
                      height={82}
                      autoPlay={true}
                      muted={true}
                      loop={true}
                      playsInline
                    >
                      <source src={item.img} />
                    </video>
                  ) : (
                    <img src={item.img} width={82} height={82} />
                  )}

                  <div>
                    <p>{item.name}</p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      SIZE {item.size} <p>{item.price}€</p>
                    </p>
                  </div>
                  <div
                    className={styles.cartItemRemove}
                    onClick={() => handleCartItemRemove(index)}
                  >
                    <svg
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
              );
            })
          ) : (
            <p className={styles.emptyCart}>add items to cart</p>
          )}

          {earlyCode != "kynzonotothemoon" ? (
            <>
              {timeLeft.days > 0 ||
              timeLeft.hours > 0 ||
              timeLeft.minutes > 0 ||
              timeLeft.seconds > 0 ? (
                <div>
                  <input
                    type="text"
                    placeholder="early access"
                    value={earlyCode}
                    onChange={(e) => setEarlyCode(e.target.value)}
                    style={{ fontSize: 16, textAlign: "center" }}
                  />
                  <button disabled={true}>
                    <p>
                      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
                      {timeLeft.hours > 0 && <span>{timeLeft.hours}h </span>}
                      {timeLeft.minutes > 0 && (
                        <span>{timeLeft.minutes}m </span>
                      )}
                      {timeLeft.seconds > 0 && <span>{timeLeft.seconds}s</span>}
                    </p>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleCheckout();
                  }}
                  disabled={currentCart == 0}
                >
                  CHECK OUT{" "}
                  {currentCart.length == 0 ? (
                    ""
                  ) : (
                    <>&#183; {calculateCartPrice()}€</>
                  )}
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleCheckout();
                }}
                disabled={currentCart == 0}
              >
                CHECK OUT{" "}
                {currentCart.length == 0 ? (
                  ""
                ) : (
                  <>&#183; {calculateCartPrice()}€</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
      {isAddToCartOpen ? (
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: 0,
            width: "100%",
            height: "calc(100vh - 50px)",
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 10,
          }}
          onClick={() => {
            if (productInformationOpen) {
              setProductInformationOpen(false);
            } else {
              setIsAddToCartOpen(false);
            }
          }}
        ></div>
      ) : (
        <></>
      )}
      <div
        className={styles.addToCart}
        style={{
          transition: "opacity 1s",
          opacity: productInformationOpen ? 1 : 0,
          display: productInformationOpen ? "block" : "none",
        }}
      >
        {currentCollection == 0 ? (
          <>
            <table>
              <tr>
                <th>SIZE</th>
                <th>LENGTH</th>
                <th>CHEST</th>
                <th>SLEEVE</th>
              </tr>
              <tr>
                <td>XS</td>
                <td>64</td>
                <td>58</td>
                <td>57</td>
              </tr>
              <tr>
                <td>S</td>
                <td>66</td>
                <td>61</td>
                <td>59</td>
              </tr>
              <tr>
                <td>M</td>
                <td>68</td>
                <td>64</td>
                <td>61</td>
              </tr>
              <tr>
                <td>L</td>
                <td>70</td>
                <td>67</td>
                <td>63</td>
              </tr>
              <tr>
                <td>XL</td>
                <td>72</td>
                <td>70</td>
                <td>65</td>
              </tr>
            </table>
            <br></br>
            <p className={styles.productInfo}>
              <p>100% french terry cotton</p>
              <p>cropped boxy fit</p>
              <p>made in china</p>
              <p>450 g/m&#178;</p>
            </p>{" "}
          </>
        ) : (
          <>
            <p className={styles.productInfo}>
              <p>designed in germany</p>
              <p>made in portugal</p>
              <p>100% cotton</p>
              <p>250 g/m&#178;</p>
            </p>{" "}
          </>
        )}
      </div>
      {isAddToCartOpen ? (
        <div
          className={styles.addToCart}
          style={{
            // top: productInformationOpen ? "30%" : "65%",
            opacity: productInformationOpen ? 0 : 1,
            zIndex: productInformationOpen ? -20 : 1000000,
          }}
        >
          <div className={styles.addToCartContent}>
            {currentCart.length >= 5 ? (
              <strong>
                <p>CART IS FULL</p>
              </strong>
            ) : (
              <>
                <strong style={{ marginBottom: 10 }}>
                  <p>{images[currentCollection].images[0].cart}</p>
                </strong>
                <select id="sizeSelect">
                  <option value="" disabled selected>
                    select size
                  </option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
                <button onClick={() => handleAddToCart()}>add to cart</button>
                <a
                  onClick={() =>
                    setProductInformationOpen(!productInformationOpen)
                  }
                  style={{ marginTop: 10, fontSize: 10 }}
                >
                  details
                </a>
              </>
            )}

            {/* <p
              className={styles.addToCartClose}
              onClick={() => setIsAddToCartOpen(false)}
            >
              <svg
                viewBox="0 0 1024 1024"
                width="18px"
                height="18px"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#000000"
                    d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                  ></path>
                </g>
              </svg>
            </p> */}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* <button
        id="shopNowButton"
        className={`${styles.openButton} ${isClicked ? styles.clicked : ""}`}
        onClick={() => toggleScreen()}
        disabled={isClicked}
      >
        OPEN SHOP
      </button> */}

      <section className={`${styles.container} `}>
        {/* ${styles.hiddenContent} */}
        <div className={styles.header}>
          <div
            className={`${styles.burgerMenu} ${
              isMenuOpen ? styles.burgerMenuOpen : ""
            }`}
            onClick={() => burgerMenuClicked()}
          >
            <span className={styles.burgerSpan1}></span>
            <span className={styles.burgerSpan2}></span>
            <span className={styles.burgerSpan3}></span>
          </div>
          <p onClick={() => (window.location = "/")}>kynzono</p>
          <p
            className={`${styles.cart} ${isCartOpen ? styles.cartSvgOpen : ""}`}
            id="cart"
            onClick={() => {
              setIsAddToCartOpen(false);
              if (!isMenuOpen) {
                setisCartOpen(!isCartOpen);
                return;
              }

              setIsMenuOpen(false);

              setTimeout(() => {
                setisCartOpen(!isCartOpen);
              }, 500);
            }}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            {!isCartOpen ? currentCart.length > 0 ? <p></p> : "" : ""}

            <div
              className={`${styles.cartx} ${
                isCartOpen ? styles.cartxopen : ""
              }`}
            >
              <span className={styles.cartx1}></span>
              <span className={styles.cartx2}></span>
            </div>
          </p>
        </div>
        {currentCollection == 2 ? (
          <div className={styles.comingSoon}>
            <p>next drop</p>
            <div className={styles.comingSoonSend}>
              <input
                type="email"
                name="email"
                placeholder="enter email here"
                style={{ textAlign: "center" }}
              ></input>
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#9b9bb3"
                  width="800px"
                  height="800px"
                  viewBox="0 0 56 56"
                >
                  <path d="M 32.7812 52.5508 C 34.4687 52.5508 35.6640 51.0977 36.5312 48.8477 L 51.8829 8.7461 C 52.3048 7.6679 52.5626 6.7070 52.5626 5.9101 C 52.5626 4.3867 51.6016 3.4492 50.0781 3.4492 C 49.2813 3.4492 48.3203 3.6836 47.2423 4.1055 L 6.9296 19.5508 C 4.9609 20.3008 3.4374 21.4961 3.4374 23.2070 C 3.4374 25.3633 5.0780 26.0898 7.3280 26.7695 L 24.2499 31.7383 L 29.1718 48.4492 C 29.8749 50.8164 30.6015 52.5508 32.7812 52.5508 Z M 25.3046 28.1758 L 9.1328 23.2305 C 8.7577 23.1133 8.6406 23.0195 8.6406 22.8555 C 8.6406 22.6914 8.7343 22.5742 9.0859 22.4336 L 40.7733 10.4336 C 42.6484 9.7305 44.4531 8.7930 46.1874 7.9961 C 44.6406 9.2617 42.7187 10.7617 41.4296 12.0508 Z M 33.1562 47.3945 C 32.9687 47.3945 32.8749 47.2305 32.7577 46.8555 L 27.8124 30.6836 L 43.9374 14.5586 C 45.2031 13.2930 46.7733 11.3242 48.0155 9.7305 C 47.2187 11.5117 46.2812 13.3164 45.5546 15.2148 L 33.5546 46.9023 C 33.4140 47.2539 33.3202 47.3945 33.1562 47.3945 Z" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}

        <div className={styles.sliderWrapper}>
          <div className={styles.slider}>
            {currentCollection == 0 && (
              <>
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  playsInline
                  style={{ outline: "none" }}
                  controls={false}
                >
                  <source
                    // id={`slide-${index}`}
                    src="/3dhoodie.mp4"
                    // alt={`Slide ${index}`}
                    style={{ outline: "none", zIndex: 0 }}
                  />
                </video>
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  style={{ outline: "none" }}
                  playsInline
                  controls={false}
                >
                  <source
                    // id={`slide-${index}`}
                    src="/3dhoodie.mp4"
                    // alt={`Slide ${index}`}
                    style={{ outline: "none" }}
                  />
                </video>
                <div
                  style={{
                    backgroundColor: "transparent",
                    opacity: 0.5,
                    width: "80%",
                    height: "55%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                  }}
                  onClick={() => {
                    setCurrentAddToCart(currentCollection);
                    setIsAddToCartOpen(true);
                  }}
                ></div>
              </>
            )}

            {currentCollection == 1 && (
              <>
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  playsInline
                  style={{ outline: "none" }}
                  controls={false}
                >
                  <source
                    // id={`slide-${index}`}
                    src="/3dshirt.mp4"
                    // alt={`Slide ${index}`}
                    style={{ outline: "none", zIndex: 0 }}
                  />
                </video>
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  style={{ outline: "none" }}
                  playsInline
                  controls={false}
                >
                  <source
                    // id={`slide-${index}`}
                    src="/3dshirt.mp4"
                    // alt={`Slide ${index}`}
                    style={{ outline: "none" }}
                  />
                </video>
                <div
                  style={{
                    backgroundColor: "transparent",
                    opacity: 0.5,
                    width: "80%",
                    height: "55%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                  }}
                  onClick={() => {
                    setCurrentAddToCart(currentCollection);
                    setIsAddToCartOpen(true);
                  }}
                ></div>
              </>
            )}
          </div>
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: -1000,
            }}
          >
            loading...
          </p>
        </div>
      </section>
    </main>
  );
}
