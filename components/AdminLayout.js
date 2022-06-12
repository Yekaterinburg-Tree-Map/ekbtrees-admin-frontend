import AdminNavigation from './AdminNavigation'

import styles from './AdminLayout.module.css'

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminNavigation />
      <div className={styles.globalContainer} >
        {children}
      </div>
    </div>
  )
}
