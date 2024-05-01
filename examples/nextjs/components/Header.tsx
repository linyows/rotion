import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from 'rotion'
import { Icon, Breadcrumbs } from 'rotion/ui'
import styles from '@/components/Header.module.css'

export interface HeaderProps {
  breadcrumbs: Breadcrumb[]
  breadcrumb_hrefs: string[]
}

const Header = ({ breadcrumbs, breadcrumb_hrefs }: HeaderProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs list={breadcrumbs} link={Link} hrefs={breadcrumb_hrefs} />
      </div>
      <div className={styles.repo}>
        <a className={styles.github} href="https://github.com/linyows/notionate" target="_blank" rel="noreferrer">
          <Icon name='github' />
          GitHub
        </a>
      </div>
    </div>
  )
}

export default Header
