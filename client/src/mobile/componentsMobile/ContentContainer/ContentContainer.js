import React from 'react';
import FlowerBoxMobile from '../../componentsMobile/FlowerBoxMobile/FlowerBoxMobile.js'
import {flowers} from "../../../services/Const/const";

const ContentContainer = (props) => {
    return (
        <div className={'contentContainer'}>
            {flowers.map(flower => {
                return (
                    <FlowerBoxMobile
                        key={Math.random() * flower.price}
                        image={flower.image}
                        name={flower.name}
                        price={flower.price}
                        story={flower.story}
                    />
                )
            })}
        </div>
    )
}

export default ContentContainer
