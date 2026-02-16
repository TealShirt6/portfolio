"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css"

export default function Header() {

  return (
    <div className={`${styles.menuBar}`} >
        <Link href="\" className={styles.name}>  <h2>Michael Bauer</h2></Link>
        <Link href="\lighting" className={styles.lighting}> <h2>Lighting</h2></Link>
    </div>
  )
}