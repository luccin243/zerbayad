import React from 'react'
import { signout, isAuthenticated } from '../auth'
import { Link, Redirect, useHistory } from 'react-router-dom'

const Fakesignout = ({ history, window }) => {
  const [red, setRed] = React.useState(false)

  const redirect = (red) => {
    if (red) return <Redirect to='/signin' />
  }

  setTimeout(() => {
    setRed(true)
  }, 5000)

  return (
    <div className='container'>
      {isAuthenticated() ? (
        <button
          className='btn btn-primary'
          style={{ marginTop: '300px', fontSize: '2em' }}
        >
          <span
            className='nav-link'
            style={{ cursor: 'pointer', color: '#ffffff' }}
            onClick={() =>
              signout(() => {
                history.push('/')
              })
            }
          >
            Signout
          </span>
        </button>
      ) : (
        <div>
          <h1>You are not connected. Youe will be redirect to signin page</h1>
          {redirect(red)}
        </div>
      )}
    </div>
  )
}

export default Fakesignout
