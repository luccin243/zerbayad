import React from 'react'
import Phone from 'react-icons/lib/fa/phone';


const CallButton = (props) => {
    return (
            <div onClick={() => props.onPress("CallToAction","CallButton", props.page)} className={'callButtonContainer'}>
                <Phone size={30} color={'#fff'}/>
            </div>
    )
}

export default CallButton
