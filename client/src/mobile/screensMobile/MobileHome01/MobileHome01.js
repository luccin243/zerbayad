import React, {Component} from 'react';
import '../Mobile.css'
import './MobileHome.css';

import ActionToCall from '../../componentsMobile/ActionToCall/ActionToCall'
import Footer from '../../componentsMobile/Footer/Footer'
import ProducttItem from '../../componentsMobile/ProductItem/ProductItem'
import BottomIcons from '../../componentsMobile/BottomIcons/BottomIcons'
import SliderHome from '../../componentsMobile/Slider/SliderHome'
import Logo from '../../componentsMobile/Logo/Logo'
// produts
import {flowersMobile} from '../../../services/Const/const';
import uniqueDesignIcon from "../../assetsMobile/imagesMobile/bottomIcons/uniqueDesign.jpg";
import MenuIcon from 'react-icons/lib/io/android-menu';
import Menu from '../../componentsMobile/Menu/Menu'
import {ChangeMetaTags} from "../../../Seo";
import {SeoMeta} from '../../../services/Const/const'

class MobileHome01 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: flowersMobile,
            callToActionPopUp: false,
            choosedCategory: 'default',
            menu: false
        }
    }

    exitPopUp = () => {
        this.setState({callToActionPopUp: false})
    }

    openPopUp = (category="default") => {
        console.log("opne")
        this.setState({callToActionPopUp: true, choosedCategory: category})
    }


    componentDidMount() {
        this.props.pageView("MobileHome")
        this.props.pageRenderedFromApp()
        ChangeMetaTags(SeoMeta.homePage.title, SeoMeta.homePage.description, SeoMeta.homePage.keywords)
    }

    toggleMenu = (toggle) => {
        this.setState({menu: toggle})
    }



    render() {
        console.log("MobileHomeRendered", this.state)
        return (
            <div>
                <div>
                    <div className={'menuIcon'} onClick={() => {
                        this.toggleMenu(true)
                    }}>
                        <MenuIcon style={{backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '100px'}} size={25}  color={"#895ECC"}/>
                    </div>
                    <Logo/>
                    <div className={'homeFirstImage'} style={{backgroundImage: `url(${require('../../assetsMobile/imagesMobile/sliderHomePage/shanaTova.jpg')})`}}>

                    </div>
                    <SliderHome openPopUp={this.openPopUp}/>
                    <div>
                        <h2 className={"iconTitle lightGreyColor"}>
                            <img src={uniqueDesignIcon}
                                 className={"bottomIconsImage"} alt=""/> זר פרחים מדהים וייחודי</h2>
                        <p className={'iconDescription'}>
                            לרגעים הטובים ביותר בחיים, לחגיגה הכי מדהימה תמיד אפשר לסמוך על זר פרחים כדי לשפר את הרגע
                        </p>
                    </div>
                    <div className="mt-20">
                           <ProducttItem renderPopUp={!this.state.menu} products={this.state.products} eventGA={this.props.eventGA}/>
                    </div>

                    <div className={'bottomIconsContainer'}>
                        <BottomIcons/>
                    </div>
                    <ActionToCall
                        callToActionPopUp={this.state.callToActionPopUp}
                        show={false}
                        page={"HomePageMobile"}
                        homePage={true}
                        eventGA={this.props.eventGA}
                        category={this.state.choosedCategory}
                        exitPopUp={this.exitPopUp}
                    />
                    {
                        this.state.menu && <Menu openPopUp={this.openPopUp} toggleMenu={this.toggleMenu}/>
                    }



                </div>
                <Footer page={"HomePageMobile"} eventGA={this.props.eventGA}/>
            </div>
        )
    }
}

export default MobileHome01;


