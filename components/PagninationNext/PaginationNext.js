import { Dropdown, Pagination, Segment } from 'semantic-ui-react'

import styles from './PaginationNext.module.css'

const pageSizeOptions = [10, 20, 50].map((el) => ({
  key: el,
  value: el,
  text: `Показывать ${el} элементов`
}))

export function PaginationNext({ limit, setLimit }) {
  const handlePageSizeChange = (event, data) => {
    const value = data?.value || 10
    setLimit(value)
  }

  return <Segment
    className={styles.paginationNext}
  >
    <div
      className={styles.select}
    >
      <Dropdown
        selection
        options={pageSizeOptions}
        onChange={handlePageSizeChange}
        defaultValue={limit}
      />
    </div>
    <div
      className={styles.pagination}
    >
      <Pagination
        defaultActivePage={0}
      />
    </div>
  </Segment>
}
