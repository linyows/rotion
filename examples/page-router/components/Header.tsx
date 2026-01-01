import Link from 'next/link'
import styles from './Header.module.css'

export interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.name}>
        <Link href="/">{title}</Link>
      </div>
    </header>
  )
}
