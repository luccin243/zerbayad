import React from 'react'
import Phone from 'react-icons/lib/fa/phone';


const PhoneHeader = (props) => {
    let {white} = props
    if (white)
        return (
            <div className='phoneHeaderContainer'>
                <div className="">
                    <p className={'phone-text'}>972-054-229-1101+</p>
                    <p className={'phone-text'}>054-2291101</p>
                </div>
                <div className='phone-icon-div' onClick={() => props.openChat()}>
                    <Phone size={24} color={"#eec368"}/>
                </div>
            </div>
        )
    return(
        <div className='col-md-11 display-inline-box mt-50'>
            <div className=''>
                <p className='phone-text1'>972-054-229-1101+</p>
                <p className='phone-text1'>054-2291101</p>
            </div>
            <div onClick={() => props.openChat()} className='phone-icon-div'>
                <Phone size={24} color={"#efc368"}/>
            </div>
        </div>
    )
}

export default PhoneHeader
