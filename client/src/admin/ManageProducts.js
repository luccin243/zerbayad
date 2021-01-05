import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from './apiAdmin'
import { API } from '../config'

const ManageProducts = () => {
  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated()

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadProducts()
      }
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const goBackBTN = () => {
    return (
      <div className='mt-5'>
        <Link to='/admin/dashboard' className='text-info'>
          Go back
        </Link>
      </div>
    )
  }

  return (
    <div className='row'>
      <div className='col-12' style={{ padding: '40px' }}>
        <h2 className='text-center'>Total {products.length} products</h2>
        <table class='table table-striped' style={{ textAlign: 'end' }}>
          <thead>
            <tr>
              <th scope='col'>Images</th>
              <th scope='col'>Remove</th>
              <th scope='col'>Update</th>
              <th scope='col'>Name</th>
              <th scope='col'>°N</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <th scope='row'>
                  <img
                    src={`${API}/products/image1/${p._id}`}
                    alt={p.name}
                    style={{ maxWidth: '50px', verticalAlign: 'middle' }}
                    class='img-thumbnail'
                  />
                </th>
                <td style={{ verticalAlign: 'middle' }}>
                  <button
                    onClick={() => destroy(p._id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <button className='btn btn-info'>Update</button>
                  </Link>
                </td>
                <td style={{ verticalAlign: 'middle' }}>{p.name}</td>
                <td style={{ verticalAlign: 'middle' }}>{i}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        {goBackBTN()}
      </div>
    </div>
  )
}

export default ManageProducts
