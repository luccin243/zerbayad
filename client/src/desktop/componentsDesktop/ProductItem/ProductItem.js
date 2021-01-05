import React, { Fragment, useState, useEffect } from 'react'

import { API } from '../../../config'
import { getProducts } from '../../../admin/apiAdmin'

// import {flowersMobile} from "../../../services/Const/const";
import { productSchema } from '../../../services/Const/const'
import freshDlowersIcon from '../../../mobile/assetsMobile/imagesMobile/bottomIcons/freshDlowersIcon.png'
import fastDeliveryIcon from '../../../mobile/assetsMobile/imagesMobile/bottomIcons/fastDeliveryIcon.png'
import Item from '../../componentsDesktop/ProductItem/Item/Item'
import Slogen from '../../componentsDesktop/Slogen/Slogen'

const ProductItem = (props) => {
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const flowersMobile = []

  const loadProducts = async () => {
    const products = await getProducts()
    if (products.length >= 1) {
      if (products.error) return setError(products.error)
      setProducts(products)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  products.map((product, index) => {
      return flowersMobile.push(productSchema(product))
  })

  return flowersMobile.map((product, index) => {
    if (index === 6) {
      return (
        <Fragment key={index}>
          <Slogen
            icon={freshDlowersIcon}
            title={'זרי פרחים טריים ויפים'}
            desription={
              'אנחנו יוצרים את הזרים שלנו עם הפרחים הטריים ביותר בחנות הפרחים שלנו'
            }
          />
          <Item index={index} product={product} />
        </Fragment>
      )
    }
    if (index === 12) {
      return (
        <Fragment key={index}>
          <Slogen
            icon={fastDeliveryIcon}
            title={'משלוח פרחים מהיר'}
            desription={'משלוחי פרחים בחיפה, טירת הכרמל, נשר, קריות'}
          />
          <Item index={index} product={product} />
        </Fragment>
      )
    }
    return (
      <Fragment key={index}>
        <Item index={index} product={product} />
      </Fragment>
    )
  })
}

export default ProductItem
