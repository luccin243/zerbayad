import React from 'react'
import './FlowerBoxDesktop.css'

const FlowerBoxDesktop = props => {
  const { image, name, price, story } = props
  return (
    <div className={'flowersForSaleContainerDesktop'}
    >
      <div className={'flowerImageForSaleDesktop'}>
        <img className={'flowerImageForSaleDesktop'} src={image} alt="" />
      </div>
      <div className={'infoContentDesktop'}>
        <div className={'priceAndNameDesktop'}>
          <h3 className={'flowerNameTitleDesktop'}>{name}</h3>
          <p className={'flowerPriceDesktop'}>{price} ש"ח </p>
        </div>
        <div className={'storyContainerDesktop'}>
          <p className={'storyTextDesktop'}>{story}</p>
        </div>
      </div>
    </div>
  )
}

export default FlowerBoxDesktop
