import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import MobileHome01 from './mobile/screensMobile/MobileHome01/MobileHome01'
import ProductPage from './mobile/screensMobile/ProductPage/ProductPage'
import DeskHome1 from './desktop/screensDesktop/DeskHome1/DeskHome1'
import DeskProductPage from './desktop/screensDesktop/DeskProductPage/DeskProductPage'
import Pot from './mobile/screensMobile/Pot/Pot'
import ReactGA from 'react-ga'
import ReactPixel from 'react-facebook-pixel'
import TagManager from 'react-gtm-module'
import smoothscroll from 'smoothscroll-polyfill'
import { createBrowserHistory } from 'history'
import { hotjar } from 'react-hotjar'
import LiveChat from 'react-livechat'

import Signup from './user/Signup'
import Signin from './user/Signin'
import Signout from './user/Fakesignout'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './admin/AdminDashboard'
import AddProduct from './admin/AddProduct'
import AddCategory from './admin/AddCategory'
import ManageProducts from './admin/ManageProducts'
import ManageCategories from './admin/ManageCategories'
import UpdateProduct from './admin/UpdateProduct'
import UpdateCategory from './admin/updateCategory'
import PrivateRoute from './auth/PrivateRoute'

const tagManagerArgs = {
  gtmId: 'GTM-T5TRHP2',
}

const tagManagerArgsL = {
  dataLayer: {
    userId: '001',
    userProject: 'project',
    page: 'home',
  },
  dataLayerName: 'PageDataLayer',
}

const history = createBrowserHistory()

function initializeReactGA() {
  ReactGA.initialize('UA-141866567-1')
  TagManager.initialize(tagManagerArgs)
}

function Event(category, action, label) {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
  ReactPixel.fbq('trackCustom', category, { action: action })
}

function PageView(page) {
  ReactGA.pageview(page)
}

ReactPixel.init('2856091371283259', {}, { debug: true, autoConfig: false })
hotjar.initialize(1410349, 6)

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      renderedFromApp: false,
    }
  }

  pageRenderedFromApp = () => {
    this.setState({
      renderedFromApp: true,
    })
  }

  componentWillMount() {
    initializeReactGA()
    this.updateWindowDimensions()
    smoothscroll.polyfill()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    if (window.innerWidth > 505) {
      this.setState({ width: window.innerWidth, height: window.innerHeight })
    }
  }

  openChat = () => {
    this.livechat.open_chat_window()
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/signout' exact component={Signout} />
          <AdminRoute
            path='/admin/dashboard'
            exact
            component={AdminDashboard}
          />
          <AdminRoute path='/create/category' exact component={AddCategory} />
          <AdminRoute path='/create/product' exact component={AddProduct} />
          <AdminRoute
            path='/admin/product/update/:productId'
            exact
            component={UpdateProduct}
          />
          <AdminRoute
            path='/admin/category/update/:categoryId'
            exact
            component={UpdateCategory}
          />
          <PrivateRoute
            path='/admin/products'
            exact
            component={ManageProducts}
          />
          <PrivateRoute
            path='/admin/categories'
            exact
            component={ManageCategories}
          />

          <Route
            exact
            path='/'
            render={() => {
              if (!isMobile)
                return (
                  <DeskHome1
                    openChat={this.openChat}
                    pageRenderedFromApp={this.pageRenderedFromApp}
                    pageView={PageView}
                    eventGA={Event}
                  />
                )
              return (
                <MobileHome01
                  pageRenderedFromApp={this.pageRenderedFromApp}
                  pageView={PageView}
                  eventGA={Event}
                />
              )
            }}
          />
          <Route
            path='/product/:productId'
            component={() => {
              if (!isMobile)
                return (
                  <DeskProductPage
                    {...this.props}
                    openChat={this.openChat}
                    renderedFromApp={this.state.renderedFromApp}
                    eventGA={Event}
                  />
                )
              return (
                <ProductPage
                  {...this.props}
                  renderedFromApp={this.state.renderedFromApp}
                  pageView={PageView}
                  eventGA={Event}
                />
              )
            }}
          />
          <Route
            path='/potPage'
            component={() => (
              <Pot renderedFromApp={this.state.renderedFromApp} />
            )}
          />
        </div>

        {!isMobile && (
          <LiveChat
            onChatLoaded={(ref) => (this.livechat = ref)}
            license={11218937}
          />
        )}
      </Router>
    )
  }
}

export default Routes
