import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { getCategories, deleteCategory } from './apiAdmin'
import { API } from '../config'

const ManageCategories = () => {
  const [categories, setCategories] = useState([])

  const { user, token } = isAuthenticated()

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadCategories()
      }
    })
  }

  useEffect(() => {
    loadCategories()
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
        <h2 className='text-center'>Total {categories.length} categories</h2>
        <table class='table table-striped' style={{ textAlign: 'end' }}>
          <thead>
            <tr>
              <th scope='col'>Remove</th>
              <th scope='col'>Update</th>
              <th scope='col'>Name</th>
              <th scope='col'>°N</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, i) => (
              <tr key={i}>
                <td style={{ verticalAlign: 'middle' }}>
                  <button
                    onClick={() => destroy(c._id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <Link to={`/admin/category/update/${c._id}`}>
                    <button className='btn btn-info'>Update</button>
                  </Link>
                </td>
                <td style={{ verticalAlign: 'middle' }}>{c.name}</td>
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

export default ManageCategories
