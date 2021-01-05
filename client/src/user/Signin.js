import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from '../auth'

import bg from '../desktop/assetsDesktop/imagesDesk/leonardoWong.png'


const Signin = () => {
  const [values, setValues] = useState({
    email: 'luccinmasirika@gmail.com',
    password: '131015',
    error: '',
    loading: false,
    redirectToDashboad: false,
  })

  const { email, password, loading, error, redirectToDashboad } = values
  const { user } = isAuthenticated()

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToDashboad: true,
          })
        })
      }
    })
  }

  const signInForm = () => (
    <form style={styleForms}>
      <h1 className='text-muted'>SING IN</h1>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          style={styleForm}
          className='form-control'
          value={email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={handleChange('password')}
          type='password'
          style={styleForm}
          className='form-control'
          value={password}
        />
      </div>
      <button onClick={onSubmit} className='btn btn-primary'>
        Submit
      </button>
      <p style={{ paddingTop: '40px' }}>
        <Link to='/signup'>Sign up</Link> if you don't yet been registred
      </p>
    </form>
  )

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    )

  const redirectUser = (redirect) => {
    if (redirect) {
      if (user && user.role === 'Admin') {
        return <Redirect to='/admin/dashboard' />
      } else {
        return <Redirect to='/user/dashboard' />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />
    }
  }


  return (
    <div class='col-xl-12'>
      <div class='col-md-6' style={styleContainer}>
        {redirectUser(redirectToDashboad)}
        {showError()}
        {signInForm()}
      </div>
      <div class='col-md-6' style={styleFleur}></div>
    </div>
  )
}

const styleContainer = {
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fafaf9',
}

const styleForms = {
  width: '75%',
  display: 'block',
  textAlign: 'left',
}

const styleForm = {
  textAlign: 'left',
}

const styleFleur = {
  backgroundImage: `url(${bg})`,
  height: '100vh',
  backgroundSize: 'cover',
}

export default Signin
