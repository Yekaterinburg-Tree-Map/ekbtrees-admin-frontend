import { fetchUsers } from '@/api/users'

import { PaginationNext } from '@/components/PagninationNext/PaginationNext'
import { useEffect, useState } from 'react'
import { Button, Dimmer, Loader, Table } from 'semantic-ui-react'
import {useRouter} from "next/router"

export default function Users() {
  const [pending, setPending] = useState(false)
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
    const update = async (total) => {
      setPending(true)
      try {
        const data = await fetchUsers(0, total)
        setUserPage(data)
      } catch (e) {
        setUserPage([])
        console.error(e)
      }
      setPending(false)
    }

    update(total).catch(console.error)
  }, [total])

  function handleRedirectToUserPage(userId) {
    return () => router.push(`/users/${userId}`).catch(console.error)
  }

  return (<>
    {pending && <div className='dimmer'>
      <Dimmer active>
        <Loader>Идёт загрузка</Loader>
      </Dimmer>
    </div>}
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
