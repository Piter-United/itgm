import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

const { Content, Footer } = Layout

import Header from './components/Header'

import PrivateRoute from './components/PrivateRoute'
import User from './components/User'
import Login from './components/Login'
import UserEdit from './components/UserEdit'
import ActivityList from './components/Activity/ActivityList'
import Activity from './components/Activity/Activity'
import NotFound from './components/NotFound'
import CommunityList from './components/Community/CommunityList'
import Community from './components/Community/Community'
import NewActivity from './components/Activity/ActivityCreate'
import NewCommunity from './components/Community/New'
import Partners from './components/Partners/Partners'

const App = () => (
  <Layout>
    <Header />
    <Content style={{ padding: '0 50px' }}>
      {/* antd переопределяет основные стили, поэтому временно закомментил */}
      <div
      // style={{
      //   background: '#fff',
      //   padding: 24,
      //   minHeight: 380,
      //   marginTop: '16px'
      // }}
      >
        <Switch>
          <Route path="/" exact component={ActivityList} />
          <PrivateRoute path="/activity/new" component={NewActivity} />
          <Route exact path="/activity/:id" component={Activity} />
          <PrivateRoute path="/activity/:id/edit" component={NewActivity} />
          <Route exact path="/community" component={CommunityList} />
          <PrivateRoute path="/community/new" component={NewCommunity} />
          <Route exact path="/community/:id" component={Community} />
          <PrivateRoute path="/user" exact component={User} />
          <PrivateRoute path="/user/edit" component={UserEdit} />
          <Route path="/login" component={Login} />
          {/* Добавил роут страницы Partners для верстки */}
          <Route path="/partners" component={Partners} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer style={{ textAlign: 'center' }} />
    </Content>
  </Layout>
)

export default App
