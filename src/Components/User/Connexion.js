import React from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
function Login() {
  return (
    <React.Fragment>
    <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form action="http://localhost:5000/api/submitConnexion" method="post">
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Email'
            placeholder='Email'
            name="email" 
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
            name="password"
          />          <Button content='Login' primary />
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