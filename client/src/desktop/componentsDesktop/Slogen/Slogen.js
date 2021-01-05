import React from 'react'

const Slogen = (props) => {
    let {icon, title, desription, h1} = props
    return (
        <div className={'deskSlogenContainer'}>
            <div className={'deskSlogenHolder'}>
                <div className={'deskSlogenIconHolder'}>
                    <img src={icon}
                         className={"bottomIconsImage"} alt=""/>
                </div>
                <div className={'deskTextIconHolder'}>
                    {h1 ?
                        <h1 className={"iconTitleDesk lightGreyColor"}>
                            {title}</h1>
                        :
                        <h2 className={"iconTitleDesk lightGreyColor"}>
                            {title}</h2>
                    }

                    <p className={'iconDescriptionDesk'}>{desription}</p>
                </div>
            </div>
        </div>
    )
}

export default Slogen
