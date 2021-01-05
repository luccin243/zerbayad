import React from 'react'
import './FlowerBoxMobile.css'

const FlowerBoxMobile = (props) => {
    const {image, name, price, story} = props
    return (
        <div className={'flowersForSaleContainer'}>
            <div className={'flowerImageForSale'}>
                <img className={'flowerImageForSale'} src={image} alt={name}/>
            </div>
            <div className={'infoContent'}>
                <div className={'priceAndName'}>
                    <h3 className={'flowerNameTitle'}>{name}</h3>
                    <p className={'flowerPrice'}>{price} ש"ח </p>
                </div>
                <div className={'storyContainer'}>
                    <p className={'storyText'}>{story}</p>
                </div>

            </div>
        </div>
    )
}

export default FlowerBoxMobile
