import React, { useState } from 'react';

// Redux
import { connect } from 'react-redux';
import { login } from '../store/actions';

// UI Components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = ({ login, loginError, loggingIn }) => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  return (
    <Paper style={{ maxWidth: '45%', margin: '200px auto 0 auto', position: 'relative', textAlign: 'center', height: '275px' }}>
      <Typography style={{paddingTop: '15px'}}>Login:</Typography>
      {loginError ? (<Typography>{loginError}</Typography>) : null}
      <form onSubmit={e => {
        e.preventDefault();
        login(loginInfo.email, loginInfo.password);
      }}>
        <div style={{ margin: '15px auto 0 auto', width: '70%' }}>
          <TextField fullWidth placeholder='E-Mail' color='primary' type='email' variant='outlined' value={loginInfo.email} onChange={e => {
            setLoginInfo({ ...loginInfo, email: e.target.value });
          }} />
        </div>
        <div style={{ margin: '15px auto 0 auto', width: '70%' }}>
          <TextField autoComplete='current-password' fullWidth placeholder='Password' type='password' variant='outlined' value={loginInfo.password} onChange={e => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }} />
        </div>
        <div style={{ height: '42px', textAlign: 'center', marginTop: '15px', paddingBottom: '10px' }}>
          {loggingIn ? <CircularProgress /> : <Button color='primary' variant='contained' style={{ marginTop: '2px' }} type='submit'>Login</Button>}
        </div>
      </form>
    </Paper>
  )
}

export default connect(({ appReducer }) => {
  return {
    loggingIn: appReducer.loggingIn,
    loginError: appReducer.loginError
  }
}, dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
})(Login);