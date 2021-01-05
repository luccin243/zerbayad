import React from 'react'
import mobileLogo from "../../assetsMobile/mobileLogo.png";

const Logo = (props) => {
    return (
        <div  className={props.class ? props.class : 'mobileLogoContainer'}>
            <a href="https://zerbayad.co.il/">
                <img src={mobileLogo} alt="zerbayad Logo" className={'mobileLogo'}/>
            </a>
        </div>
    )
}

export default Logo
