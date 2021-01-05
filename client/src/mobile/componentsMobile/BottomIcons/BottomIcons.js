import React from 'react';
import {bottomIcons} from '../../../services/Const/const';

const BottomIcons = () => {
    let icons = bottomIcons.map(icon => {
        return (
            <div key={Math.random()} className={"bottomIconsImageContainer"}>
                {icon.title === "משלוח פרחים מהיר" ?
                    <h1 className={"iconTitle lightGreyColor"}><img src={icon.image} className={"bottomIconsImage"} alt=""/>{icon.title}</h1>

                    :
                    <h2 className={"iconTitle lightGreyColor"}><img src={icon.image} className={"bottomIconsImage"} alt=""/>{icon.title}</h2>
                }
                <p className={'iconDescription'}>
                    {icon.description}
                </p>
            </div>
        )
    })
    return (
        icons
    )
}

export default BottomIcons;
