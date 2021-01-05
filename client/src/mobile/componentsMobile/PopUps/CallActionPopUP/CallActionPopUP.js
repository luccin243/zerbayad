import React from 'react'
import Zoom from 'react-reveal/Fade';
import Phone from 'react-icons/lib/fa/phone';
import WhatsApp from 'react-icons/lib/fa/whatsapp';

import Close from "react-icons/lib/md/clear";
import buquetOfTheWeekIcon from '../../../assetsMobile/imagesMobile/popUps/buquetOfTheWeekRound.png'
import greatService from '../../../assetsMobile/imagesMobile/popUps/greatService.jpg'
import smile from '../../../assetsMobile/imagesMobile/popUps/smile.jpg'
import happyBirthDay from '../../../assetsMobile/imagesMobile/popUps/happyBirthDay.jpg'
import anniversaryDay from '../../../assetsMobile/imagesMobile/popUps/anniversaryDay.jpg'
import loveInTheAir from '../../../assetsMobile/imagesMobile/popUps/loveInTheAir.jpg'
import sorrowCandle from '../../../assetsMobile/imagesMobile/popUps/sorrowCandle.jpg'






const CallActionPopUP = (props) => {
    const {category, text} = props.category ? props : {}
    console.log("props.category",props.category)

    let textToCostumer = "חוויית שירות בלתי נשכחת"
    let serViceText = "תנו לנציג שלנו לתת לכם שירות אישי"
    let imgShowTo = greatService
    let alt = "שירות לקוחות זר ביד"
    let titleImg = "חנות פרחים"

    if (category === "FLOWER_OF_THE_WEEK") {
        imgShowTo = buquetOfTheWeekIcon
        alt = "זר השבוע"
        titleImg = "זר השבוע"
        textToCostumer = "בחירה מעולה"
    }
    switch (category) {
        case "FLOWER_OF_THE_WEEK":
            imgShowTo = buquetOfTheWeekIcon
            alt = "זר השבוע"
            titleImg = "זר השבוע"
            textToCostumer = "בחירה מעולה"
            break;
        case "FLOWER_BUQUET":
            imgShowTo = smile
            alt = "חיוך"
            titleImg = "חיוך"
            textToCostumer = "בחירה מעולה"
            break;
        case "BIRTH_DAY":
            imgShowTo = happyBirthDay
            alt = "זר פרחים ליום הולדת"
            titleImg = "זר פרחים ליום הולדת"
            textToCostumer = "יום הולדת שמח"
            serViceText="אנחנו נכין להם זר יום הולדת מהמם"
            break;
        case "ANNIVERSARY_DAY":
            imgShowTo = anniversaryDay
            alt = "יום נישואים"
            titleImg = "יום נישואים"
            textToCostumer = "יום נישואים שמח לכם יקירי"
            serViceText="אנחנו נכין לה את הזר המושלם"
            break;
        case "LOVE_IN_THE_AIR":
            imgShowTo = loveInTheAir
            alt = "אהבה"
            titleImg = "אהבה"
            textToCostumer = "אוייש הפרפרים בבטן איזה כייף"
            serViceText="אנחנו מכירים את הנושא אנחנו נכין בדיוק את מה שצריך"
            break;
        case "GIVE":
            imgShowTo = smile
            alt = "זר פרחים כמתנה"
            titleImg = "זר פרחים כמתנה"
            textToCostumer = "כל הכבוד, פרחים זאת מתנה מדהימה"
            break;
        case "SORROW":
            imgShowTo = sorrowCandle
            alt = "לוויה"
            titleImg = "אבל"
            textToCostumer = "משתפפים בצערכם"
            serViceText="נעשה כל מה שצריך כדי להקל עליכם"
            break;

        default:
            break
    }
    return (

        <Zoom duration={1000}>
            <div className={'callActionPopUP'}>

                <div className={'callPopUp'}>
                    <div onClick={() => props.exit()} className={'exitPopUp'}>
                        <Close size={20} color={"#b7b7b7"}/>
                    </div>
                    <div className={'popUpImageHolder'}>
                        {category === "FLOWER_OF_THE_WEEK" ?
                            <a href="https://zerbayad.co.il/productPage/5"> <img src={imgShowTo} className={'popUpImg'} alt={alt} title={titleImg}/></a>
                        :
                            <img src={imgShowTo} className={'popUpImg'} alt={alt} title={titleImg}/>
                        }
                    </div>
                    <div className={'popUpTextHolder'}>
                        <p className={'popUpTitle'}>{textToCostumer} </p>
                        <p className={'popUpDescription howYouOrderText'}>{serViceText}</p>
                        <p className={'howYouOrderText'}>איך תרצו להזמין?</p>
                    </div>
                    <div className={'buttonsHolder'}>
                        <div className={'callToButton'}
                             onClick={() => props.eventGA("ContactMade", "Phone pressed", props.page)}>
                            <a className={'callToButton'} href="tel:0542291101"> חייג <Phone size={20}
                                                                                             color={"darkgreen"}
                                                                                             style={{marginRight: 5}}/>
                            </a>
                        </div>
                        <div className={'separatorCallButton'}/>
                        <div className={'whatUpButton'}
                             onClick={() => props.eventGA("ContactMade", "WhatsUpButton button pressed", props.page)}>
                            <a href="https://wa.me/+972542291101/?text=שלום אני רוצה להזמין זר"><WhatsApp size={20}
                                                                                                          color={"darkgreen"}
                                                                                                          style={{marginLeft: 5}}/> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </Zoom>

    )
}

export default CallActionPopUP
