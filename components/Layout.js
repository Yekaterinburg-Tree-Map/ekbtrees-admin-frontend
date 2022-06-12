import styles from './Layout.module.css'
import React from 'react'

export default function Layout({ children }) {
  return (
    <div className={styles.darkBackground} >
      {children}
    </div>)
}
