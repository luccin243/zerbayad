import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createProduct, getCategories } from './apiAdmin'

import bg from '../desktop/assetsDesktop/imagesDesk/christieKim.png'

const AddProduct = () => {

  const [values, setValues] = useState({
    name: '',
    description: '',
    story: '',
    price: '',
    price2: '',
    price3: '',
    categories: [],
    category: '',
    shipping: '',
    procentege: '',
    quantity: '',
    image1: '',
    image2: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  })

  const { user, token } = isAuthenticated()
  const {
    name,
    description,
    story,
    price,
    price2,
    price3,
    categories,
    procentege,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        })
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = (name) => (event) => {
    const value =
      name === 'image1' || name === 'image2'
        ? event.target.files[0]
        : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: '', loading: true })

    console.log('values', values)

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        console.log('data', data)
        console.log('data Img', data.image1)
        setValues({
          ...values,
          name: '',
          description: '',
          story: '',
          image1: '',
          image2: '',
          price: '',
          price2: '',
          price3: '',
          procentege: '',
          category: '',
          shopping: '',
          quantity: '',
          loading: false,
          error: '',
          createdProduct: data.name,
        })
      }
    })
  }

  const newPostForm = () => (
    <form onSubmit={onSubmit} style={styleForms}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          style={styleForm}
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Description</label>
        <textarea
          onChange={handleChange('description')}
          className='form-control'
          style={styleForm}
          value={description}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Story</label>
        <textarea
          onChange={handleChange('story')}
          className='form-control'
          style={styleForm}
          value={story}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price</label>
        <input
          onChange={handleChange('price')}
          type='number'
          className='form-control'
          style={styleForm}
          value={price}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price 2</label>
        <input
          onChange={handleChange('price2')}
          type='number'
          className='form-control'
          style={styleForm}
          value={price2}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Price 3</label>
        <input
          onChange={handleChange('price3')}
          type='number'
          className='form-control'
          style={styleForm}
          value={price3}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Procentege</label>
        <input
          onChange={handleChange('procentege')}
          type='number'
          className='form-control'
          style={styleForm}
          value={procentege}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Category</label>
        <select
          onChange={handleChange('category')}
          className='form-control'
          style={styleForm}
        >
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Shipping</label>
        <select
          onChange={handleChange('shipping')}
          className='form-control'
          style={styleForm}
        >
          <option>Please select</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label className='text-muted'>Quantity</label>
        <input
          onChange={handleChange('quantity')}
          type='number'
          style={styleForm}
          className='form-control'
          value={quantity}
        />
      </div>

      <h4>Post Image 1</h4>
      <div className='form-group'>
        <label className='form-label'>
          <input
            onChange={handleChange('image1')}
            type='file'
            name='image1'
            style={styleForm}
            className='form-control'
            accept='image/*'
          />
        </label>
      </div>

      <h4>Post Image 2</h4>
      <div className='form-group'>
        <label className='form-label'>
          <input
            onChange={(handleChange('image2'))}
            type='file'
            name='image2'
            style={styleForm}
            className='form-control'
            accept='image/*'
          />
        </label>
      </div>

      <button className='btn btn-primary'>Create Product</button>
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

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: createdProduct ? '' : 'none' }}
    >
      <h2>{`${createdProduct}`} is created</h2>
    </div>
  )

  const showLoading = () =>
    loading && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    )

  return (
    <div class='col-xl-12'>
      <div class='col-md-6' style={styleContainer}>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newPostForm()}
      </div>
      <div class='col-md-6' style={styleFleur}></div>
    </div>
  )
}

const styleContainer = {
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 0',
  background: '#fafaf9',
  overflow: 'auto',
  textAlign: 'left',
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
  backgroundPosition: 'center',
}

export default AddProduct
