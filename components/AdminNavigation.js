import Link from 'next/link'
import { useRouter } from 'next/router'


import { Menu, Header, Button } from 'semantic-ui-react'

import styles from './AdminNavigation.module.css'

export default function Navigation() {
  const router = useRouter()

  const loggedIn = false

  return (
    <nav className={styles.navContainer}>
      <Header as="h3">
        <span>Ekbtrees admin panel</span>
      </Header>
      <Menu pointing secondary>
        <Menu.Item
          active={(router.pathname).includes('/users')}
        >
          <Link href="/users">
            Users
          </Link>
        </Menu.Item>
        <Menu.Item
          active={(router.pathname).includes('/trees')}
        >
          <Link href="/trees">
            Trees
          </Link>
        </Menu.Item>
        { !loggedIn &&
          <Button
            primary
            className={styles.loginButton}
            onClick={() => router.push(`/login?redirectUri=${encodeURIComponent(router.pathname)}`)}
          >
            Войти
          </Button> ||
          <Button
            primary
            className={styles.loginButton}
            // todo add logout
          >
            Выйти
          </Button>
        }
      </Menu>
    </nav>
  )
}
