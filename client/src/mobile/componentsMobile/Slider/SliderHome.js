import React, {Component, Fragment} from 'react'
import {flowersMobile} from '../../../services/Const/const';
import {Link} from "react-router-dom";




class SliderHome extends Component {
    constructor(props) {
        super(props);
        this.pause = this.pause.bind(this);
    }


    pause() {
        this.slider.slickPause();
    }


    render() {
        const settings = {
            dots: true,
            speed: 700,
            className: "Slider",
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            afterChange: () => this.pause()
        };

        return (
            <Fragment>
                <div  className={'slideHolder'}>
                    <Link to={{pathname: `/productPage/${5}`}}>
                    <div className={'flowerOfTheWeek'} style={{backgroundImage: `url(${require('../../assetsMobile/imagesMobile/sliderHomePage/flowerOfTheWeekSagolBateva.jpg')})`}}>
                        <div className={'flowerOfTheWeekInfo'}>
                            <div className={'flowerOfTheWeekText'}>
                                <p className={'sellTextIconFlowerOfTheWeek'}>זר השבוע</p>
                                <p className={'buquetNameText'}>{flowersMobile[5].name}</p>
                            </div>

                        </div>
                    </div>
                    </Link>
                </div>
                <div  className={'slideHolder'}>
                    <Link to={{pathname: `/productPage/${17}`}}>
                        <div className={'flowerOfTheWeek'} style={{backgroundImage: `url(${require('../../assetsMobile/imagesMobile/sliderHomePage/waseDill.jpg')})`}}>

                        </div>
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default SliderHome
