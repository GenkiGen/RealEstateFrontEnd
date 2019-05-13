import { Route, Switch } from 'react-router-dom'
import React from 'react'
import UpdateAdvertisement from '../../Advertisement/UpdateAd'
import AdPage from '../../Advertisement/AdPage'
import AllAds from '../../Advertisement/AllAds'

const AdRoutes = () => {
  return (
    <div className="hero is-info is-fullheight">
      <div className="hero-body">
        <div className="container">
          <Switch>
            <Route path="/advertisements/:id/update" component={UpdateAdvertisement}/>
            <Route path="/advertisements/:id" component={AdPage}/>
            <Route path="/advertisements/" component={AllAds}/>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default AdRoutes