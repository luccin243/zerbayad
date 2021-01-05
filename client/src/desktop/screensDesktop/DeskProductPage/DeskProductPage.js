import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import './DeskProductPage.css'
// import {flowersMobile} from "../../../services/Const/const";

import { read } from '../../../core/apiCore'
import { productSchema } from '../../../services/Const/const'

import MdArrowBack from 'react-icons/lib/md/arrow-forward'
import PhoneHeader from '../../componentsDesktop/PhoneHeader/PhoneHeader'
import Footer from '../../componentsDesktop/Footer/Footer'
import { ChangeMetaTags } from '../../../Seo'
import { SeoMeta } from '../../../services/Const/const'

const DeskProductPage = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)

  let {
    name,
    story,
    description,
    productSlider,
    sell,
    procentege,
    priceSizes,
    category,
  } = product

  const loadSingleProduct = async (productId) => {
    const data = await read(productId)
    if (data && data.error) {
      setError(data.error)
    } else {
      setProduct(productSchema(data))
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const productId = props.match.params.productId
    updateMetaTags()
    loadSingleProduct(productId)
    console.log('props.match.params.product', props.match.params.product)
    console.log('product', product)
  }, [props])

  const updateMetaTags = () => {
    let { description } = product
    ChangeMetaTags(
      description,
      description,
      ` ${description} ,` + SeoMeta.homePage.keywords
    )
  }

  return (
    <div className={'deskHome'}>
      {!product.name ? (
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          ...Loading
        </h2>
      ) : (
        <div>
          <div
            className={'back-btn-div p-22-0 '}
            style={{ paddingRight: '10px' }}
          >
            <button
              onClick={() =>
                props.renderedFromApp
                  ? props.history.goBack()
                  : window.location.replace('/')
              }
              className={'pull-left back-btn'}
            >
              <MdArrowBack size={35} color={'#895ECC'} />
            </button>
          </div>
          <div class='col-md-12 p-0'>
            <div class='col-md-6 p-0'>
              <div id='myCarousel' class='carousel slide' data-ride='carousel'>
                <ol class='carousel-indicators'>
                  {productSlider &&
                    productSlider.map((x, index) => {
                      if (index === 0) {
                        return (
                          <li
                            data-target='#myCarousel'
                            key={index}
                            data-slide-to={index}
                            className='active'
                          />
                        )
                      }
                      return (
                        <li
                          data-target='#myCarousel'
                          key={index}
                          data-slide-to={index}
                        />
                      )
                    })}
                </ol>
                <div class='carousel-inner'>
                  {productSlider &&
                    productSlider.map((pic, index) => {
                      if (index == 0)
                        return (
                          <div className='item active' key={index}>
                            <div>
                              <img
                                src={pic}
                                alt={description}
                                key={index}
                                className='desk2SliderImg'
                              />
                            </div>
                          </div>
                        )
                      return (
                        <div className='item' key={index}>
                          <div>
                            <img
                              src={pic}
                              alt={description}
                              className='desk2SliderImg'
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
                <a
                  class='left carousel-control'
                  href='#myCarousel'
                  data-slide='prev'
                >
                  <span class='glyphicon glyphicon-chevron-left desk2-slide-btn' />
                  <span class='sr-only'>Previous</span>
                </a>
                <a
                  class='right carousel-control'
                  href='#myCarousel'
                  data-slide='next'
                >
                  <span class='glyphicon glyphicon-chevron-right desk2-slide-btn' />
                  <span class='sr-only'>Next</span>
                </a>
              </div>
            </div>
            <div class='col-md-6'>
              <PhoneHeader openChat={props.openChat} white={false} />
              <div class='col-md-12 p-0-5vw'>
                <p class='desk2-title'>{name}</p>
                <h1 class='desk2-title-text'>{description}</h1>
              </div>
              <div class='col-md-12 p-0-5vw '>
                <p class='desk2-info'>{story}</p>
              </div>
              <div className={'col-md-12 mt-70 p-0-5vw'}>
                {priceSizes &&
                  priceSizes.map((price, index) => {
                    let size =
                      category === 'pot'
                        ? ['ענף 1 ', '2 ענפים', '3 ענפים']
                        : ['רגיל', 'גדול (*בתמונה)', 'ענק']
                    return (
                      <Fragment key={price}>
                        {sell ? (
                          <div
                            className={
                              index === 1
                                ? 'priceCategoryHolder'
                                : 'priceCategoryHolder currentPriceHolder'
                            }
                          >
                            <p className={' price-textDesk '}>{size[index]}</p>
                            <p className={'pl-4vw  m-0 price-text mb-5'}>
                              {Math.round(price * procentege)} ₪{' '}
                              <span className={'sellPriceStrike'}>
                                <strike>{price}</strike>
                              </span>
                            </p>
                          </div>
                        ) : (
                          <div
                            className={
                              index === 1
                                ? 'priceCategoryHolder'
                                : 'priceCategoryHolder currentPriceHolder'
                            }
                          >
                            {priceSizes.length > 1 && (
                              <p className={' price-textDesk '}>
                                {price.length ? size[index] : ''}
                              </p>
                            )}
                            <p className={'pl-4vw pr-4vw m-0 price-text mb-5'}>
                              {price.length ? `${Math.round(price)} ₪` : ''}
                            </p>
                          </div>
                        )}
                      </Fragment>
                    )
                  })}
              </div>
              {console.log('product', product)}
              <div className='col-md-12 col-md-12 p-0-5vw mt-70 display-flex mb-70'>
                <button
                  onClick={() => props.openChat()}
                  className={'desk2-order-now-btn'}
                >
                  הזמנה
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default withRouter(DeskProductPage)
