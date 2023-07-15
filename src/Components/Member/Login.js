import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { login } from '../../Services/member'
import { setAuthToken } from '../../setAuthToken';


function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [, setToken] = useState();

  let navigate = useNavigate();

const googleLogin = useGoogleLogin({
  flow: 'auth-code',
  redirect_uri: `${process.env.REACT_APP_API_URL}/google/redirect`,
  onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      // const tokens = await axios.pgetost(
      //   `${process.env.REACT_APP_API_URL}/google/callback`, {
      //         code: codeResponse.code,
      //     });

      // console.log(tokens);
  },
  onError: errorResponse => console.log(errorResponse),
});

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await login({
      email,
      password
    });
    console.log('token', response)
    setToken(response.token);
    localStorage.setItem("token", response.token);
    setAuthToken(response.token);

    return navigate('/');
  }

  return (
    <div className="content">
      <React.Fragment >
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
              <GoogleLogin
                f
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Button content='Sign up' icon='signup' size='big' as='a' href="/signup" />
              <Button content='Sign up Google' icon='signup' size='big' as='a' onClick={() => googleLogin()} />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>

      </React.Fragment>
    </div>
  )
}

export default Login