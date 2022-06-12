import { fetchTrees, deleteTree } from '@/api/trees'
import { useEffect, useState } from 'react'
import { Button, Table, Pagination } from 'semantic-ui-react'
import _ from 'lodash'
import {useRouter} from "next/router"

export default function Trees() {
  const [treePage, setTreePage] = useState([])
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(12)
  const router = useRouter()

  const tableHeaders = [
    {
      key: 'id',
      value: 'id'
    },
    {
      key: 'species',
      value: 'Порода',
      accessor: (tree) =>  _.get(tree, 'species.title') || 'Неизвестна'
    },
    {
      key: 'treeHeight',
      value: 'Высота',
      accessor: (tree) =>  `${(tree.treeHeight || 0).toFixed(1)}м`
    },
    {
      key: 'diameterOfCrown',
      value: 'Диаметр кроны',
      accessor: (tree) =>  `${(tree.diameterOfCrown || 0).toFixed(1)}м`
    },
    {
      key: 'status',
      value: 'Статус',
      accessor: (tree) =>  tree.status || 'Неизвестен'
    },
    {
      key: 'treePlantingType',
      value: 'Тип посадки',
      accessor: (tree) =>  tree.treePlantingType || 'Неизвестен'
    }
  ]

  useEffect(() => {
    fetchTrees(offset, limit)
      .then((result) => setTreePage(result))
      .catch((e) => {
        setTreePage([])
        console.error(e)
      })
  }, [])

  function handleRedirectToTreePage(treeId) {
    return () => router.push(`/trees/${treeId}`).catch(console.error)
  }

  function handleDeleteTree(treeId) {
    return () => deleteTree(treeId).catch(console.error)
  }

  return (<>
    <Table striped color='green'>
      <Table.Header>
        <Table.Row>
          {tableHeaders.map((header, index) => (
            <Table.HeaderCell collapsing key={index}>
              {header.value}
            </Table.HeaderCell>
          ))}
          <Table.HeaderCell collapsing key={'buttons'}>
            Управление
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {treePage.map((tree, index) => (
          <Table.Row key={index}>
            {tableHeaders.map((header, subIndex) => (
              <Table.Cell key={subIndex}>
                {header.accessor && header.accessor(tree) || tree[header.key]}
              </Table.Cell>
            ))}
            <Table.Cell key={`buttons_${index}`}>
              <Button
                color='green'
                onClick={handleRedirectToTreePage(tree.id)}
              >Редактировать</Button>
              <Button
                color='red'
                onClick={handleDeleteTree(tree.id)}
              >Удалить</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <Pagination
      defaultActivePage={0}
    />
  </>)
}
