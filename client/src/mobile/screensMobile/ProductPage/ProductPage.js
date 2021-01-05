import React, {Component, Fragment} from 'react';
import '../Mobile.css'
import Slider from "react-slick";
import { withRouter } from 'react-router-dom';

import {flowersMobile, SeoMeta} from '../../../services/Const/const';
import Footer from '../../componentsMobile/Footer/Footer'

import MdArrowBack from 'react-icons/lib/md/arrow-forward';
import ActionToCall from "../../componentsMobile/ActionToCall/ActionToCall";
import {ChangeMetaTags} from "../../../Seo";


class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productNum : ''
        }
        this.pause = this.pause.bind(this);
    }

    componentWillMount() {
        this.setState({
            productNum:  this.props.match.params.product
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.updateMetaTags()
    }

    pause() {
        this.sliderProduct.slickPause();
    }

    moveSlide() {
        this.sliderProduct.slickNext()
    }

    updateMetaTags = () => {
        let { description,category } = flowersMobile[this.state.productNum];
        let keyWords = category === 'pot' ? ` ${description} ,` + SeoMeta.potPage.keywords : ` ${description} ,` + SeoMeta.homePage.keywords
        ChangeMetaTags(description,description,keyWords)
    }


    render() {

        console.log("this.props", this.props)

        const settings1 = {
            dots: true,
            className: "Slider1",
            speed: 500,
            autoplay: true,
            autoplaySpeed: 1000,
            infinite: true,
            afterChange: () => this.pause()
        };
        let {name, story,  description, productSlider, sell, procentege, priceSizes, category} = flowersMobile[this.state.productNum];
        this.props.pageView("MobileProductPage " + name)
        return (
            <div style={{direction: "rtl"}}>
                <div className={'back-btn-div p-22-0'}>
                        <button onClick={ () => this.props.renderedFromApp ? this.props.history.goBack() :  window.location.replace("https://zerbayad.co.il/")} className={'pull-left back-btn'}>
                            <MdArrowBack size={25} color={"#895ECC"}/>
                        </button>
                </div>
                <Slider ref={slider => (this.sliderProduct = slider)} {...settings1}>
                    {
                        productSlider && productSlider.map(pic => {
                            return (
                                <div key={Math.random()} className={'slideHolder1'} onClick={() => this.moveSlide()} onTouchStart={() => this.moveSlide()}>
                                    <img src={pic} alt={description} title={name} className={'sliderImage1'}/>
                                </div>
                            )
                        })
                    }
                </Slider>
                <div className={'priceAndOrder'}>
                    <div className={'priceCategory'}>
                        {
                            priceSizes.map((price, index) => {
                                let size = category === 'pot' ? ["ענף 1 ", "2 ענפים", "3 ענפים"] : ['רגיל', 'גדול', 'ענק']
                                return (
                                    <Fragment key={price}>
                                        {
                                            sell ?
                                                <div
                                                    className={index === 1 ? 'priceCategoryHolder' : 'priceCategoryHolder currentPriceHolder'}>
                                                    <p className={' pr-4vw  price-text '}>
                                                        {size[index]}
                                                    </p>
                                                    <p className={'pl-4vw pr-4vw m-0 price-text mb-5'}>
                                                        {price * procentege} ₪ <span
                                                        className={'sellPriceStrike'}><strike>{price}</strike></span>
                                                    </p>
                                                </div>
                                                :
                                                <div
                                                    className={index === 1 ? 'priceCategoryHolder' : 'priceCategoryHolder currentPriceHolder'}>
                                                    {priceSizes.length > 1 &&
                                                        <p className={' pr-4vw  price-text '}>
                                                            {
                                                                price.length ? size[index] : ''
                                                            }
                                                    </p>}
                                                    <p className={'pl-4vw pr-4vw m-0 price-text mb-5'}>
                                                        { price.length ? `${price} ₪` : ''}
                                                    </p>
                                                </div>
                                        }
                                    </Fragment>

                                )
                            })
                        }
                    </div>
                    <div className={'w-50pr pl-2vh'} style={{zIndex: 3}}>
                        <ActionToCall show={true} page={"Product Mobile" + name} eventGA={this.props.eventGA}/>

                    </div>

                </div>

                <div className={'nameAndDescription'}>
                    <p className={'pl-4vw pr-4vw m-0 price-text mb-5 fs-18'}>
                        {name}
                    </p>
                    <p className={'pl-4vw pr-4vw m-0 price-text mb-5 fs-16 ta-left lh sub-t-c mt-5'}>
                        {story}
                    </p>
                    <h1 className={'pl-4vw pr-4vw m-0 price-text mb-5 fs-18'}>
                         {description}
                    </h1>
                </div>
                <Footer page={"ProductPageMobile"} eventGA={this.props.eventGA}/>
            </div>

        )
    }
}

export default withRouter(ProductPage)



