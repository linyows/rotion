import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const y = new Date(Date.now()).getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.nav}>
        <Link href="/">Rotion</Link>
        {` / `}
        <a href="https://linyows.notion.site/Rotion-6d6150cf068f4293a78b6fd9fa8d0181" target="_blank" rel="noreferrer">See on Notion</a>
        {` / `}
        <a href="https://github.com/linyows/rotion/issues" target="_blank" rel="noreferrer">Github Issues</a>
      </div>
      <div className={styles.copyright}>
        &copy; {y} <a href="https://github.com/linyows" target="_blank" rel="noreferrer">linyows</a>
      </div>
    </footer>
  )
}
