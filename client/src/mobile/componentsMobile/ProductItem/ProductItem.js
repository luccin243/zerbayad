import React ,{Fragment} from 'react'
import {Link} from "react-router-dom";
import PrivateOrder from '../../componentsMobile/PrivateOrder/PrivateOrder'
import {flowersMobile} from '../../../services/Const/const';
import fastDeliveryIcon from "../../assetsMobile/imagesMobile/bottomIcons/fastDeliveryIcon.png";
import freshDlowersIcon from "../../assetsMobile/imagesMobile/bottomIcons/freshDlowersIcon.png";
import imageAziz from "../../assetsMobile/imagesMobile/productPage/sahlavLavan01.jpg";

const ProductItem = (props) => {
    let range = flowersMobile
    let products = range.map((product, index) => {
        let {image, name, price, description, sell, procentege, sells} = product
        let d = new Date();
        let day = d.getDay()
        if(day === 0) day = 0.5
        let sellWeek = Math.round(day * 0.5 * sells)
        if(props.pot && index < 18 ||  !props.pot && index > 17) return
        if(index === 2 && !props.pot) {
            return (
                <Fragment key={Math.random()}>
                    <div className={'slogenHolder'}>
                        <h2 className={"iconTitle lightGreyColor"}>
                            <img src={freshDlowersIcon}
                                 className={"bottomIconsImage"} alt="זרי פרחים טריים"/>זרי פרחים טריים ויפים</h2>
                        <p className={'iconDescription'}>
                            אנחנו יוצרים את הזרים שלנו עם הפרחים הטריים ביותר בחנות הפרחים שלנו
                        </p>
                    </div>
                    <div   title={description} onClick={() => {
                        props.eventGA("Flower pressed", name, "Home Page Mobile")
                    }}>
                        <Link to={{pathname: `/productPage/${index}`}}>
                            <div className={'productHolder'}
                                 style={{backgroundImage: `url(${image})`}}
                            >
                                <div className={"sellIcon"}>
                                    {sell &&  <p className={'sellTextIcon'}>מבצע</p>}
                                </div>
                                <div className={"productText"}>
                                    <div className={'priceHolder'}>
                                        <div className={'priceHolderText'}>
                                            { sell ?
                                                <Fragment>
                                                    <p className={'buquetPriceText'}>{price * procentege} ₪ </p>
                                                    <p className={'buquetPriceTextSell'}><strike>{price} </strike> </p>
                                                </Fragment>
                                                :
                                                <p className={'buquetPriceText'}>{price} ₪ </p>
                                            }
                                        </div>
                                        <p className={'howManyBuysText'}>השבוע קנו-{sellWeek}</p>
                                    </div>
                                    <div>
                                        <p className={'buquetNameText'}>{name}</p>
                                        <p className={'productTextdescription'}>{description}</p>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    </div>
                </Fragment>
            )
        }
        if(index === 4 && !props.pot) {
            return (
                <Fragment key={Math.random()}>
                    <div className={'slogenHolder'}>
                        <h1 className={"iconTitle lightGreyColor"}>
                            <img src={fastDeliveryIcon}
                                 className={"bottomIconsImage"} alt="משלוח פרחים"/>משלוח פרחים מהיר</h1>
                        <p className={'iconDescription'}>
                            משלוחי פרחים בחיפה, טירת הכרמל, נשר, קריות
                        </p>
                    </div>
                    <div  title={description} onClick={() => {
                        props.eventGA("Flower pressed", name, "Home Page Mobile")
                    }}>
                        <Link to={{pathname: `/productPage/${index}`}}>
                            <div className={'productHolder'}
                                 style={{backgroundImage: `url(${image})`}}
                            >
                                <div className={"sellIcon"}>
                                    {sell &&  <p className={'sellTextIcon'}>מבצע</p>}
                                </div>
                                <div className={"productText"}>
                                    <div className={'priceHolder'}>
                                        <div className={'priceHolderText'}>
                                            { sell ?
                                                <Fragment>
                                                    <p className={'buquetPriceText'}>{price * procentege} ₪ </p>
                                                    <p className={'buquetPriceTextSell'}><strike>{price} </strike> </p>
                                                </Fragment>
                                                :
                                                <p className={'buquetPriceText'}>{price} ₪ </p>
                                            }
                                        </div>
                                        <p className={'howManyBuysText'}>השבוע קנו-{sellWeek}</p>
                                    </div>
                                    <div>
                                        <p className={'buquetNameText'}>{name}</p>
                                        <p className={'productTextdescription'}>{description}</p>
                                    </div>

                                    {/*<div className={'buttonProductHome'} >*/}
                                    {/*<p className={'buttonProductHomeText'}>עוד פרטים  </p>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </Link>
                    </div>
                </Fragment>
            )
        }
        if(index === 6 && !props.pot) {
            return (
                <Fragment key={Math.random()}>
                    <Link to={{pathname: '/potPage'}}>
                        <div className={'potCategoryHolder'}
                             style={{backgroundImage: `url(${imageAziz})`}}
                        >
                            <div className={'buttonProductHome'}>
                                <p className={'buttonProductHomeText'}>עציצים</p>
                            </div>
                        </div>
                    </Link>
                    <PrivateOrder renderPopUp={props.renderPopUp} eventGA={props.eventGA}/>
                    <div title={description}  onClick={() => {
                        props.eventGA("Flower pressed", name, "Home Page Mobile")
                    }}>
                        <Link to={{pathname: `/productPage/${index}`}}>
                            <div className={'productHolder'}
                                 style={{backgroundImage: `url(${image})`}}
                            >
                                <div className={"sellIcon"}>
                                    {sell &&  <p className={'sellTextIcon'}>מבצע</p>}
                                </div>
                                <div className={"productText"}>
                                    <div className={'priceHolder'}>
                                        <div className={'priceHolderText'}>
                                            { sell ?
                                                <Fragment>
                                                    <p className={'buquetPriceText'}>{price * procentege} ₪ </p>
                                                    <p className={'buquetPriceTextSell'}><strike>{price} </strike> </p>
                                                </Fragment>
                                                :
                                                <p className={'buquetPriceText'}>{price} ₪ </p>
                                            }
                                        </div>
                                        <p className={'howManyBuysText'}>השבוע קנו-{sellWeek}</p>
                                    </div>
                                    <div>
                                        <p className={'buquetNameText'}>{name}</p>
                                        <p className={'productTextdescription'}>{description}</p>
                                    </div>

                                    {/*<div className={'buttonProductHome'} >*/}
                                        {/*<p className={'buttonProductHomeText'}>עוד פרטים  </p>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </Link>
                    </div>
                </Fragment>
                )
        }
        return (
            <div title={description} key={Math.random()}  onClick={() => {
                props.eventGA("Flower pressed", name, "Home Page Mobile")
            }}>
                <Link to={{pathname: `/productPage/${index}`,params:{from: "app"}}} >
                    <div className={'productHolder'}
                         style={{backgroundImage: `url(${image})`}}
                        >
                        <div className={"sellIcon"}>
                            {sell &&  <p className={'sellTextIcon'}>מבצע</p>}
                        </div>
                        <div className={"productText"}>
                            <div className={'priceHolder'}>
                                <div className={'priceHolderText'}>
                                    { sell ?
                                        <Fragment>
                                            <p className={'buquetPriceText'}>{price * procentege} ₪ </p>
                                            <p className={'buquetPriceTextSell'}><strike>{price} </strike> </p>
                                        </Fragment>
                                        :
                                        <p className={'buquetPriceText'}>{price} ₪ </p>
                                    }
                                </div>
                                <p className={'howManyBuysText'}>השבוע קנו-{sellWeek}</p>
                            </div>
                            <div>
                                <p className={'buquetNameText'}>{name}</p>
                                <p className={'productTextdescription'}>{description}</p>
                            </div>

                            {/*<div className={'buttonProductHome'} >*/}
                                    {/*<p className={'buttonProductHomeText'}>  עוד פרטים </p>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </Link>
            </div>
        )
    })
    return (
        <div className="productsContents">
            {products}
        </div>
    )
}

export default ProductItem;
