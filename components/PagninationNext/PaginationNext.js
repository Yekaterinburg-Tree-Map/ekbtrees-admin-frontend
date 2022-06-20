import { Button, Dropdown, Segment } from 'semantic-ui-react'

import styles from './PaginationNext.module.css'
import { useState } from 'react'

const pageSizeOptions = [10, 20, 50].map((el) => ({
  key: el,
  value: el,
  text: `Показывать ${el} элементов`
}))

export function PaginationNext({ limit, setLimit, setTotal }) {
  const [currentPageCount, setCurrentPageCount] = useState(1)

  const handlePageSizeChange = (event, data) => {
    const value = data?.value || 10
    setLimit(value)
    setTotal(value * currentPageCount)
  }

  const handleLoadMore = () => {
    const newPageCount = currentPageCount + 1
    setCurrentPageCount(newPageCount)
    setTotal(limit * (newPageCount))
  }

  return <Segment
    className={styles.paginationNext}
  >
    <Dropdown
      selection
      options={pageSizeOptions}
      onChange={handlePageSizeChange}
      defaultValue={limit}
    />
    <Button
      primary
      onClick={handleLoadMore}
    >
      Загрузить ещё
    </Button>
  </Segment>
}
