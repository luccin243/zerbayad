import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { getCategory, updateCategory } from './apiAdmin'

import bg from '../desktop/assetsDesktop/imagesDesk/leonardoWong.png'

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    error: '',
    redirectToProfile: false,
  })

  const { user, token } = isAuthenticated()

  const { name, error, redirectToProfile } = values

  const init = (categoryId) => {
    getCategory(categoryId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: data.name,
        })
      }
    })
  }

  useEffect(() => {
    init(match.params.categoryId)
  }, [])

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const category = {
      name: name,
    }
    updateCategory(match.params.categoryId, user._id, token, category).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({
            ...values,
            name: data.name,
            error: false,
            redirectToProfile: true,
          })
        }
      }
    )
  }

  const updateCategoryForm = () => (
    <form onSubmit={onSubmit} style={styleForms}>
      <h2>Update category</h2>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange('name')}
          value={name}
          style={{ textAlign: 'left' }}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-primary'>Save changes</button>
    </form>
  )

  const showError = () => (
    <div
      className={'alert alert-danger'}
      role='alert'
      style={{ display: error ? '' : 'none' }}
    >
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
      {error}
    </div>
  )

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to='/admin/categories' />
      }
    }
  }

  const goBackBTN = () => {
    return (
      <div className='mt-5'>
        <Link to='/admin/categories' className='text-info'>
          Go back
        </Link>
      </div>
    )
  }

  return (
    <div className='row'>
      {!name ? <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          ...Loading
        </h2> : (
        <div class='col-xl-12'>
          <div class='col-md-6' style={styleContainer}>
            {showError()}
            {updateCategoryForm()}
            {goBackBTN()}
            {redirectUser()}
          </div>
          <div class='col-md-6' style={styleFleur}></div>
        </div>
      )}
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

const styleFleur = {
  backgroundImage: `url(${bg})`,
  height: '100vh',
  backgroundSize: 'cover',
}

export default UpdateCategory
