import React, { useState } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import axios from 'axios'
import { login } from '../../Services/member'

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [, setToken] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await login({
      email,
      password
    });
    console.log(token)
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    setToken(token);
  }

  return (
    <React.Fragment>
      <Segment placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                icon='user'
                iconPosition='left'
                label='Email'
                placeholder='Email'
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
                name="password"
                onChange={e => setPassword(e.target.value)}
              />
              <Button type='submit'>Login</Button>
            </Form>
          </Grid.Column>      <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' as='a' href="/inscription" />
          </Grid.Column>
        </Grid>    <Divider vertical>Or</Divider>
      </Segment>

    </React.Fragment>
  )
}

export default Login