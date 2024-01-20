import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PageIcon } from 'rotion/ui'
import styles from '@/components/Header.module.css'

export interface Breadcrumb {
  icon: string
  href: string
  name: string
}

interface HeaderProps {
  breadcrumbs: Breadcrumb[] 
}

const Crumbs = ({ icon, href, name }: Breadcrumb) => {
  return (
    <Link href={href} className={styles.link}>
      <Image src={icon} width={20} height={20} alt={name} />
      <span>
        {name}
      </span>
    </Link>
  )
}

const Header = ({ breadcrumbs }: HeaderProps) => {
  const max = breadcrumbs.length
  return (
    <div className={styles.layout}>
      <div className={styles.breadcrumbs}>
        {breadcrumbs.map((v: Breadcrumb, i: number) => (
          <span key={`crumb-${i}`}>
            <Crumbs icon={v.icon} href={v.href} name={v.name} />
            {i+1 < max && <span className={styles.slash}>/</span>}
          </span>
        ))}
      </div>
      <div className={styles.repo}>
        <a className={styles.github} href="https://github.com/linyows/notionate" target="_blank" rel="noreferrer">
          <PageIcon name='github' />
          GitHub
        </a>
      </div>
    </div>
  )
}

export default Header
