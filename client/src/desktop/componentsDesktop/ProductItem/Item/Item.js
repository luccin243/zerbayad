import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Item = (props) => {
  let { index } = props
  let {
    id,
    image,
    name,
    price,
    description,
    sell,
    procentege,
    sells,
  } = props.product
  let d = new Date()
  let day = d.getDay()
  if (day === 0) day = 0.5
  let sellWeek = Math.round(day * 0.5 * sells)
  return (
    <Link to={{ pathname: `/product/${id}` }}>
      <div title={description} className='col-md-4 deskProductContainer'>
        <div className='w-100pr'>
          <div
            className={'deskProductHolder'}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className={'sellIconDesk'}>
              {sell && <p className={'sellTextIconDesk'}>מבצע</p>}
            </div>
            <div className={'deskProductText'}>
              <div className={'deskProductInfo'}>
                <p className={'title'}>{name}</p>
                <p className={'info'}>{description}</p>
              </div>
              <div className={'deskProductPriceContainer'}>
                {sell ? (
                  <div className={'deskPriceHolder'}>
                    <p className={'price'}>
                      {Math.round(price * procentege)} ₪
                    </p>
                    <p className={'priceSell'}>
                      <strike>{price} </strike>
                    </p>
                  </div>
                ) : (
                  <p className={'price'}>{price} ₪ </p>
                )}
                <p className={'deskHowManyBuysText'}>השבוע קנו-{sellWeek}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Item
