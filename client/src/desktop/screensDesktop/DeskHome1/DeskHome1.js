import React, {Fragment} from 'react'
import './DeskHome1.css'
import {flowersMobile} from "../../../services/Const/const";
import uniqueDesignIcon from "../../../mobile/assetsMobile/imagesMobile/bottomIcons/uniqueDesign.jpg";

import Footer from '../../componentsDesktop/Footer/Footer'
import ProductItem from '../../componentsDesktop/ProductItem/ProductItem'
import Slogen from '../../componentsDesktop/Slogen/Slogen'
import FirstImpressionContainer from '../../componentsDesktop/FirstImpressionContainer/FirstImpressionContainer'

import {ChangeMetaTags} from "../../../Seo";
import {SeoMeta} from '../../../services/Const/const'

class DeskHome1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            flowers: flowersMobile,
            flowerLoad: false
        }
    }

    componentDidMount() {
        this.props.pageRenderedFromApp()
        ChangeMetaTags(SeoMeta.homePage.title, SeoMeta.homePage.description, SeoMeta.homePage.keywords)
        console.log(document.getElementsByTagName("META")[1])
    }

    render() {
        return (
            <div>
                <div className={'deskHome'}>
                    <FirstImpressionContainer openChat={this.props.openChat}/>
                    <Slogen icon={uniqueDesignIcon} title={" זר פרחים מדהים וייחודי"} desription={"לרגעים הטובים ביותר בחיים, לחגיגה הכי מדהימה תמיד אפשר לסמוך על זר פרחים כדי לשפר את הרגע"} />
                    <ProductItem/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default DeskHome1
