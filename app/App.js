import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

const { Content, Footer } = Layout

import HomePage from './components/HomePage/HomePage'
import PrivateRoute from './components/PrivateRoute'
import User from './components/User'
import Login from './components/Login'
import UserEdit from './components/UserEdit'
import Activity from './components/Activity/Activity'
import NotFound from './components/NotFound'
import CommunityList from './components/Community/CommunityList'
import Community from './components/Community/Community'
import NewActivity from './components/Activity/ActivityCreate'
import NewCommunity from './components/Community/New'
import Partners from './components/Partners/Partners'

import Trying_header from './pages/trying_header'
import Trying_user_menu from './pages/trying_user_menu'
import Trying_main_menu from './pages/trying_main_menu'

const App = () => (
  <Switch>
    <Route path="/trying/mainmenu" exact component={Trying_main_menu} />
    <Route path="/trying/header" exact component={Trying_header} />
    <Route path="/trying/usermenu" exact component={Trying_user_menu} />

    <Route path="/" exact component={HomePage} />
    <PrivateRoute path="/activity/new" component={NewActivity} />
    <Route exact path="/activity/:id" component={Activity} />
    <PrivateRoute path="/activity/:id/edit" component={NewActivity} />
    <Route exact path="/community" component={CommunityList} />
    <PrivateRoute path="/community/new" component={NewCommunity} />
    <Route exact path="/community/:id" component={Community} />
    <PrivateRoute path="/user" exact component={User} />
    <PrivateRoute path="/user/edit" component={UserEdit} />
    <Route path="/partners" component={Partners} />
    <Route path="/login" component={Login} />
    <Route component={NotFound} />
  </Switch>
)

export default App
