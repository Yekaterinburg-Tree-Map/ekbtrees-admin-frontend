import { Dropdown, Pagination, Segment, Select } from 'semantic-ui-react'

import styles from './PaginationNext.module.css'

export function PaginationNext() {
  return <Segment>
    <Select
      className={styles.select}
    >
      <Dropdown>

      </Dropdown>
    </Select>
    <Pagination
      defaultActivePage={0}
    />
  </Segment>
}
