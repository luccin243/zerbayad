import React, {Fragment} from 'react'
import zerBayadLogo from "../../assetsDesktop/imagesDesk/homeSlider/headerLogo.png";
import PhoneHeader from '../../componentsDesktop/PhoneHeader/PhoneHeader'

const FirstImpressionContainer = (props) => {
    return(
        <Fragment >
            <div className={'headerLogoPhone'}>
                <div className=''>
                    <img src={zerBayadLogo} alt="Los Angeles" className="logoDesktop"/>
                </div>
                <PhoneHeader white={true}/>
            </div>
            <div className={"homePageFirstScreen"}>
                <h1>זר ביד כאן תמצאו זרי פרחים מדהימים<br/> ורדים, חמניות, סחלבים ועוד.</h1>
                <p>לחג, למשרד, לחתונה, או סתם מאהבה</p>
            </div>
        </Fragment>
    )
}

export default FirstImpressionContainer
