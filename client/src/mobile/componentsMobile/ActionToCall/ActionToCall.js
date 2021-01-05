import React, {Component} from 'react';

import CallButton from '../../componentsMobile/CallButton/CallButton.js'
import CallActionPopUP from '../../componentsMobile/PopUps/CallActionPopUP/CallActionPopUP'

class ActionToCall extends Component {
    constructor(props) {
        super(props)
        this.state = {
            callToActionPopUp: false,
            showButton: false,
            category: 'default'
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.addActionButton)
        console.log("ActionToCall componentDidMount this.props.category", this.props)
        this.setState({ category: this.props.category})
    }

    callAction = (action, button, page, category) => {
        this.setState({callToActionPopUp: true , category})
        this.props.eventGA(action, button, page)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("nextProps.callToActionPopUp",nextProps.callToActionPopUp)
        if(this.state.callToActionPopUp !== nextProps.callToActionPopUp){
            this.setState({callToActionPopUp: nextProps.callToActionPopUp})
        }
        if(this.state.category !== nextProps.category){
            this.setState({category: nextProps.category})
        }
    }


    exitPopUp = () => {
        this.setState({callToActionPopUp: false, category: 'default'})
        if(this.props.exitPopUp) this.props.exitPopUp()
    }

    addActionButton = () => {
        let y = window.pageYOffset
        if (y > 150 && !this.state.showButton) {
            this.setState({showButton: true})
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.addActionButton)
    }

    render() {
        console.log("ActionToCall", this.state)
        let showPopUp = this.state.callToActionPopUp
        let showMe = this.state.showButton
        if(!showMe && !this.props.show && !this.state.callToActionPopUp) return null
        return (
            <div >
                {
                    this.props.homePage && showMe ?
                    <CallButton
                        page={this.props.page}
                        onPress={this.callAction}
                    />
                    :
                        <div onClick={() => this.callAction("CallToAction", "BuyButton", this.props.page,  'FLOWER_BUQUET')} >
                            <button   className={'buy-now-btn'}>להזמנה</button>
                        </div>

                }
                {showPopUp &&
                <CallActionPopUP
                    page={this.props.page}
                    eventGA={this.props.eventGA}
                    exit={this.exitPopUp}
                    category={this.state.category}
                />
                }
            </div>
        );
    }
}

export default ActionToCall;
