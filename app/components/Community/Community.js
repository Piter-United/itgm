import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Breadcrumbs } from 'ui/Breadcrumbs'
import { Curl } from 'ui/Curl'
import { ActivityAuthor } from '../Activity/atoms/ActivityAuthor'
import { Participants } from '../Activity/atoms/Participants'
import CommunitySocial from './atoms/CommunitySocial'
import CommunityTags from './atoms/CommunityTags'
import ActivityList from 'components/Activity/atoms/ActivityList'

import { Spin, Divider, Avatar } from 'antd'

import { GET_BY_ID } from 'store/community'

import './Community.css'
// import PenIcon from 'icons/Pen.svg'
import { InnerPageContentContainer } from '../InnerPageContentContainer'

const Community = ({
  match: {
    params: { id }
  }
}) => {
  const { dispatch, communityInfo, user } = useStoreon('communityInfo', 'user')

  useEffect(() => {
    dispatch(GET_BY_ID, id)
  }, [id, dispatch])

  if (communityInfo.loading) {
    return <Spin size="large" />
  }
  if (!communityInfo.data || !communityInfo.data.community) {
    return (
      <InnerPageContentContainer>
        <div>Not found</div>
      </InnerPageContentContainer>
    )
  }

  const { community, participants, activity } = communityInfo.data
  const social = community.social.filter(s => s.icon !== 'global')
  const globalLink = community.social.filter(s => s.icon === 'global')[0]

  return (
    <InnerPageContentContainer>
      <div className="Community-Breadcrumbs">
        <Breadcrumbs path="/community" viewPath="/Сообщества" />
      </div>
      <div className="Community-Body">
        <div className="Community-Content">
          <div className="Community-HeaderContainer">
            <h2 className="Community-Header">{community.name}</h2>
            {/*{user && user.id === community.owner.id && (*/}
            {/*  <Link style={{ lineHeight: '48px' }} to={`/community/${id}/edit`}>*/}
            {/*    <PenIcon />*/}
            {/*  </Link>*/}
            {/*)}*/}
          </div>
          {globalLink && (
            <div className="Community-Link">
              <a href={globalLink.link}>{globalLink.link}</a>
            </div>
          )}
          <CommunityTags data={community.tags || []} />
          <div className="Community-Description">{community.description}</div>
          <ActivityAuthor
            avatar={community.owner.avatar}
            user={community.owner.name}
            community={community.name}
            createdAt={community.ts}
          />
          {/*<Divider />*/}
          {/*{activity.length > 0 && (*/}
          {/*  <ActivityList*/}
          {/*    activitiesData={{*/}
          {/*      loading: communityInfo.loading,*/}
          {/*      list: activity*/}
          {/*    }}*/}
          {/*    userId={user.id}*/}
          {/*    dispatch={dispatch}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
        <Divider className="Community-Separator" type="vertical" />
        <div className="Community-Additional">
          {/*<div style={{ textAlign: 'center' }}>*/}
          {/*  <Avatar*/}
          {/*    size={102}*/}
          {/*    src={community.logo}*/}
          {/*    style={{ margin: '10px auto' }}*/}
          {/*  />*/}
          {/*</div>*/}
          <CommunitySocial data={social} />
          <div className="Community-Participants">
            <p className="Community-ParticipantsTitle">Участники</p>
            <Participants data={participants || []} />
          </div>
        </div>
      </div>
      <Curl />
    </InnerPageContentContainer>
  )
}

export default Community
