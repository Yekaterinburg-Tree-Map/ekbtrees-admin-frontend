import { Button, Container, Form, Segment } from 'semantic-ui-react'
import { useState } from 'react'
import { fetchToken } from '@/api/auth'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  const [error, setError] = useState(null)

  const { redirectUri } = router.query

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = document.forms[0]
    try {
      await fetchToken(email.value, password.value)
      await router.push(redirectUri || '/')
    } catch (e) {
      console.log(e)
      setError('Пользователь не найден')
    }
  }

  return <>
    <Container text>
      <Segment>
        <Form
          onSubmit={handleSubmit}
        >
          <Form.Input
            fluid
            label='Email'
            placeholder='Email'
            name='email'
          />
          <Form.Input
            fluid
            label='Password'
            placeholder='Password'
            type='password'
            name='password'
          />
          <Button
            type='submit'
            primary
          >
            Войти
          </Button>
          {error && <div>{error}</div>}
        </Form>
      </Segment>
    </Container>
  </>
}
