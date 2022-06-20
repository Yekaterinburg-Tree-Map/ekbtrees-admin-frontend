import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchUser } from '@/api/users'
import {
  Breadcrumb,
  Button,
  Container,
  Dimmer,
  Form,
  Grid,
  Loader,
  Segment,
} from 'semantic-ui-react'

// eslint-disable-next-line complexity
export default function Tree() {
  const router = useRouter()
  const [userData, setUserData] = useState(null)

  const { id: userId } = router.query
  console.log(router.query)

  useEffect(() => {
    fetchUser(userId)
      .then((data) => setUserData(data))
      .catch((err) => {
        console.error('error fetching tree', userId, err)
        setUserData(null)
      })
  }, [userId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handle submit')
  }

  return <>
    <Breadcrumb>
      <Breadcrumb.Divider icon="left chevron"/>
      <Breadcrumb.Section
        link
        onClick={() => router.push('/users')}
      >
        К списку пользователей
      </Breadcrumb.Section>
    </Breadcrumb>
    {userData && <Container>
      <Form
        onSubmit={handleSubmit}
      >
        <Segment>
          <Grid columns={2}>
            <Grid.Column>
              <Form.Input
                label="Имя"
                key="firstName"
                defaultValue={userData.firstName || ''}
              />
              <Form.Input
                label="Фамилия"
                key="lastName"
                value={userData.lastName || ''}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                label="Email"
                key="email"
                defaultValue={userData.email || ''}
              />
              <Form.Input
                label="Номер телефона"
                key="phone"
                type="phone"
                value={userData.phone || ''}
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Button type="submit" color="green">Сохранить</Button>
        </Segment>
      </Form>
    </Container> || <Dimmer active>
      <Loader/>
    </Dimmer>}
  </>
}
