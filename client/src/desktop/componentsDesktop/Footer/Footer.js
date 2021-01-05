import React from 'react'

import Instagram from 'react-icons/lib/fa/instagram';
import Facebook from 'react-icons/lib/fa/facebook';
import Linkedin from 'react-icons/lib/fa/linkedin';

const Footer = (props) => {
    return (
        <div className='col-md-12 col-sm-12 col-xs-12 desk-footer w-100pr'>
            <div className='col-md-11 col-sm-9 col-xs-12'>
                <div className=''>
                    <p className='desk-footer-text mb-0 pull-right'> 2019. All rights reserved IDT Version:1.1.9</p>
                </div>

            </div>
            <div className='col-md-1 display-inline-box'>
                <a href="https://www.instagram.com/zerbayad/" target="_blank">
                    <Instagram size={30} color={"#CB28A0"}/>
                </a>
                <div className={'mr-2vh'}>
                    <a className="mobile" target="_blank"
                       href="https://www.facebook.com/Zerbayad">
                        <Facebook size={30} color={"#4367B2"}/>
                    </a>
                </div>
                <div className='p-0-10'>
                    <a className="mobile" target="_blank"
                       href="https://www.linkedin.com/company/zerbayad">
                        <Linkedin size={30} color={"#0278B5"}/>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
