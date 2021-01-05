import React, {Component} from 'react';
import Close from "react-icons/lib/md/clear";
import Logo from '../../componentsMobile/Logo/Logo'


class Menu extends Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={'menu'} >
                <div className={'menuContentHolder'}>
                    <div className={'closeMenuHolder'}>
                        <div onClick={() => this.props.toggleMenu(false)}>
                            <Close  size={25} color={"#895ECC"}/>
                        </div>
                        <div className={'menuList'}>
                            <div className={'menuObject'}>
                                <a href="https://zerbayad.co.il/potPage">עציצים</a>
                            </div>
                            <div  className={'menuObject'} onClick={()=>this.props.openPopUp('BIRTH_DAY')}>
                                <p>זר פרחים ליום הולדת</p>
                            </div>
                            <div className={'menuObject'} onClick={()=>this.props.openPopUp('ANNIVERSARY_DAY')}>
                                <p>זר פרחים ליום נישואים</p>
                            </div>
                            <div className={'menuObject'} onClick={()=>this.props.openPopUp('LOVE_IN_THE_AIR')}>
                                <p>זר פרחים מאהבה</p>
                            </div>
                            <div className={'menuObject'} onClick={()=>this.props.openPopUp('GIVE')}>
                                <p>זר פרחים כמתנה</p>
                            </div>
                            <div className={'menuObject' } onClick={()=>this.props.openPopUp('SORROW')}>
                                <p>פרחים ללוויה</p>
                            </div>
                            <div className={'menuObject'}>
                                <a href="tel:0542291101">שירות לקוחות</a>
                            </div>
                        </div>
                    </div>
                    <Logo class={'menuLogo'}/>
                </div>
            </div>
        )
    }

}


export default Menu
