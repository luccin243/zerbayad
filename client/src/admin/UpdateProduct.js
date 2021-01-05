import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { getProduct, getCategories, updateProduct } from './apiAdmin'

import bg from '../desktop/assetsDesktop/imagesDesk/christieKim.png'

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    story: '',
    price: '',
    price2: '',
    price3: '',
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
  const [categories, setCategories] = useState([])

  const { user, token } = isAuthenticated()
  const {
    name,
    description,
    story,
    price,
    price2,
    price3,
    procentege,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          story: data.story,
          price: data.price,
          price2: data.price2,
          price3: data.price3,
          procentege: data.procentege,
          category: data.category._id,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        })
        initCategories()
      }
    })
  }

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    init(match.params.productId)
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

    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
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
      }
    )
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
            onChange={handleChange('image2')}
            type='file'
            name='image2'
            style={styleForm}
            className='form-control'
            accept='image/*'
          />
        </label>
      </div>

      <button className='btn btn-primary'>Update Product</button>
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
      <h2>{`${createdProduct}`} is updated!</h2>
    </div>
  )

  const showLoading = () =>
    (loading) && (
      <div className='alert alert-success'>
        <h2>Loading...</h2>
      </div>
    )

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to='/admin/products' />
      }
    }
  }

  const goBackBTN = () => {
    return (
      <div className='mt-5'>
        <Link to='/admin/products' className='text-info'>
          Go back
        </Link>
      </div>
    )
  }

  return (
    <div>
      {!values.name ? (
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          ...Loading
        </h2>
      ) : (
        <div className='col-xl-12'>
          <div className='col-md-6' style={styleContainer}>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {goBackBTN()}
            {newPostForm()}
            {redirectUser()}
          </div>
          <div className='col-md-6' style={styleFleur}></div>
        </div>
      )}
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

export default UpdateProduct
