import React, { useEffect, useState } from 'react'
import useStoreon from 'storeon/react'
import { Spin, Typography, Layout, Divider } from 'antd'

import { GET_CURRENT_USER } from 'store/user'
import history from '../../history'

import UserInfo from './UserInfo'
import CommunityBadgeList from 'components/Community/CommunityBadgeList'

import 'components/Form/_view/Form_view_profile.css'
import 'components/List/_type/List_type_unstyled.css'
import 'components/List/_view/List_view_communities.css'
import './User.css'
import CommunityList from 'components/Community/CommunityList'

const { Paragraph } = Typography
const { Header, Footer, Content } = Layout

const User = () => {
  const { user, dispatch } = useStoreon('user')

  useEffect(() => {
    dispatch(GET_CURRENT_USER)
  }, [dispatch])

  console.log('User = ', user)
  if (!user) {
    return <Spin size="large" />
  }
  const {
    email,
    community,
    phone,
    name,
    company,
    about,
    id,
    communities,
    specialization,
    avatar_hash
  } = user

  //TODO: format with regexp for phones;
  const formattedPhone = num => {}
  const communityList = [{ ...community, primary: true }, ...communities]
  return (
    //TODO: Remove this after page layout will be done
    <Layout className="wrapper">
      <Header className="header" />
      <Content style={{ margin: '0 auto', maxWidth: '54%' }}>
        <UserInfo {...user} />
        <Divider style={{ border: '1px solid #ABABAB', margin: '0' }} />
        <CommunityBadgeList list={communityList} />
        <Divider style={{ border: '1px solid #ABABAB', margin: '0' }} />
      </Content>
      <Footer className="footer" />
    </Layout>
  )
}

export default User
