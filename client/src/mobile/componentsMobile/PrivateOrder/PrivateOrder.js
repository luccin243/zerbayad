import React from "react";
import ActionToCall from "../../componentsMobile/ActionToCall/ActionToCall";

const PrivateOrder = (props) => {
    return (
        <div className={'privateOrderConteiner'}>
            <p className={'privateOrderText'}> זר פרחים בעיצוב אישי</p>
            <p className={'privateOrderText'}>בתקציב שלך</p>
            <p className={'privateOrderTextInto'}>אנחנו נעצב לך זר פרחים לפי התקציב שלך, לפני שהזר ישלח אנחנו
                נשלח לך תמונה של הזר המדהים שהכנו עבורך... </p>
            {
                props.renderPopUp &&
                <ActionToCall show={true}  page={"HomePageMobile"} homePage={false} eventGA={props.eventGA}/>
            }
        </div>
    )
}

export default PrivateOrder
