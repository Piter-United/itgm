import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

const { Content, Footer } = Layout

import Header from './components/Header'

import PrivateRoute from './components/PrivateRoute'
import { User, Login } from './components/User'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Community from './components/Community'

const App = () => (
  <Layout>
    <Header />
    <Content style={{ padding: '0 50px' }}>
      <div
        style={{
          background: '#fff',
          padding: 24,
          minHeight: 380,
          marginTop: '16px'
        }}
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/community" component={Community} />
          <PrivateRoute path="/user" component={User} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer style={{ textAlign: 'center' }} />
    </Content>
  </Layout>
)

export default App
