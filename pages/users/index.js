import { fetchUsers } from '@/api/users'

import { PaginationNext } from '@/components/PagninationNext/PaginationNext'
import { useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import {useRouter} from "next/router"

export default function Users() {
  const [userPage, setUserPage] = useState([])
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(10)

  const router = useRouter()

  const tableHeaders = [
    {
      key: 'id',
      value: 'id'
    },
    {
      key: 'email',
      value: 'Email',
    },
    {
      key: 'firstName',
      value: 'Имя',
    },
    {
      key: 'lastName',
      value: 'Фамилия',
    },
    {
      key: 'phone',
      value: 'Номер телефона',
    },
  ]

  useEffect(() => {
    fetchUsers(0, total)
      .then((result) => {
        console.log(result)
        setUserPage(result)
      })
      .catch((e) => {
        setUserPage([])
        console.error(e)
      })
  }, [total])

  function handleRedirectToUserPage(userId) {
    return () => router.push(`/users/${userId}`).catch(console.error)
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
        {userPage.map((user, index) => (
          <Table.Row key={index}>
            {tableHeaders.map((header, subIndex) => (
              <Table.Cell key={subIndex}>
                {header.accessor && header.accessor(user) || user[header.key]}
              </Table.Cell>
            ))}
            <Table.Cell key={`buttons_${index}`}>
              <Button
                color='green'
                onClick={handleRedirectToUserPage(user.id)}
              >Редактировать</Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    <PaginationNext
      limit={limit}
      setLimit={setLimit}
      setTotal={setTotal}
    />
  </>)
}
