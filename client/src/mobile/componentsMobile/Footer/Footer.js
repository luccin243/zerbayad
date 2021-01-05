import React from 'react'
import Instagram from "react-icons/lib/fa/instagram";
import Facebook from "react-icons/lib/fa/facebook-official";

const Footer = (props) => {
    return(
        <div className={'footer-main'}>
            <div className={'mt-8'}>
                <hr className={'m-0 hr-c'}/>
            </div>
            <div className={'footerMobile'}>
                <div className={'p-15 footerTitle'} >
                    <p className={'foot-text'}>Powered by <a href="https://idt.co.il/">© IDT</a>
                        <span className={'versionText'}> Version: 1.1.9</span>
                    </p>
                </div>
                <div className={'p-15 display-flex'} onClick={() => props.eventGA("SocialButton", "Facebook", props.page)}>
                    <div className={'mr-2vh'}>
                        <a className="mobile"
                           href="fb://facewebmodal/f?href=https://it-it.facebook.com/Zerbayad/">
                            <Facebook size={30} color={"#efc368"}/>
                        </a>
                    </div>
                    <div className={'mr-2vh'} onClick={() => props.eventGA("SocialButton", "Instagram", props.page)}>
                        <a href="instagram://user?username=zerbayad" >
                            <Instagram size={30} color={"#efc368"}/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  Footer
