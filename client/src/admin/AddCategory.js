import React, { useState } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'

import bg from '../desktop/assetsDesktop/imagesDesk/leonardoWong.png'

const AddCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user, token } = isAuthenticated()

  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setError('')
        setSuccess(true)
      }
    })
  }

  const newCategoryFom = () => (
    <form onSubmit={onSubmit} style={styleForms}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          style={{ textAlign: 'left' }}
          autoFocus
          required
        />
      </div>
      <button className='btn btn-primary'>Create Category</button>
    </form>
  )

  const showSuccess = () => {
    if (success) {
      return <h3 className='text-success'>{name} is created</h3>
    }
  }

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  return (
    <div class='col-xl-12'>
      <div class='col-md-6' style={styleContainer}>
        {showSuccess()}
        {showError()}
        <div style={styleForms}>{newCategoryFom()}</div>
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

const styleFleur = {
  backgroundImage: `url(${bg})`,
  height: '100vh',
  backgroundSize: 'cover',
}

export default AddCategory
