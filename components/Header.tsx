"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./header.module.css"

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("top");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (scrollY == 0) {
        setScrollDirection("top")
      } else if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  return scrollDirection;
};

export default function ImageCarousel() {
    const scrollDirection = useScrollDirection()
  return (
    <div className={`${styles.menuBar} ${styles[scrollDirection]}`} >
        <Link href="\" className={styles.name}>  <h2>Michael Bauer</h2></Link>
        <Link href="\lighting" className={styles.lighting}> <h2>Lighting</h2></Link>
    </div>
  )
}