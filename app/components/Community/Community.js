import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from 'ui/Breadcrumbs'
import { Curl } from 'ui/Curl'
import { ActivityAuthor } from '../Activity/atoms/ActivityAuthor'
import { Participants } from '../Activity/atoms/Participants'

import { Spin, Tag, Divider } from 'antd'

import { GET_BY_ID } from 'store/community'

import './Community.css'
import PenIcon from 'icons/Pen.svg'
import VkIcon from 'icons/vk.svg'
import TwitterIcon from 'icons/twitter.svg'
import FacebookIcon from 'icons/facebook.svg'
import GithubIcon from 'icons/github.svg'
import InstagramIcon from 'icons/instagram.svg'
import LinkedInIcon from 'icons/linkedin.svg'
//TODO add youtube icon
import YoutubeIcon from 'icons/linkedin.svg'

const socialIconsMap = {
  vk: <VkIcon className="Community-SocialIcon" />,
  twitter: <TwitterIcon className="Community-SocialIcon" />,
  facebook: <FacebookIcon className="Community-SocialIcon" />,
  github: <GithubIcon className="Community-SocialIcon" />,
  instagram: <InstagramIcon className="Community-SocialIcon" />,
  linkedIn: <LinkedInIcon className="Community-SocialIcon" />,
  youtube: <YoutubeIcon className="Community-SocialIcon" />
}

const Community = ({
  match: {
    params: { id }
  }
}) => {
  const { dispatch, communityInfo, userId } = useStoreon(
    'communityInfo',
    'userId'
  )

  useEffect(() => {
    dispatch(GET_BY_ID, id)
  }, [id, dispatch])

  console.log(communityInfo, userId)
  if (!communityInfo.data || communityInfo.data.community.id !== id) {
    return <Spin size="large" />
  }

  const { community } = communityInfo.data

  const social = community.social.filter(s => s.icon !== 'global')
  const globalLink = community.social.filter(s => s.icon === 'global')[0]
  //TODO link tags with the server data when it will be exist
  const tags = ['Tag 1', 'UX Analytics', 'tag 3']
  //TODO link tags with the server data when it will be exist
  const participants = [{ id: 1 }, { id: 2 }, { id: 3 }]

  const renderSocial = socialData =>
    socialData.length !== 0 && (
      <div className="Community-Social">
        <div className="Community-SocialTitle">Сообщество в интернете</div>
        {social.map(social => (
          <a
            style={{
              marginRight: 10
            }}
            key={social.icon}
            href={social.link}
          >
            {socialIconsMap[social.icon]}
          </a>
        ))}
      </div>
    )

  return (
    <div className="Community-Page">
      <div className="Community-Breadcrumbs">
        <Breadcrumbs path="/community" viewPath="/Сообщества" />
      </div>
      <div className="Community-Body">
        <div className="Community-Content">
          <div className="Community-HeaderContainer">
            <h2 className="Community-Header">{community.name}</h2>
            {userId === community.owner.id && (
              <Link style={{ lineHeight: '48px' }} to={`/community/${id}/edit`}>
                <PenIcon />
              </Link>
            )}
          </div>
          {globalLink && (
            <div className="Community-Link">
              <a href={globalLink.link}>{globalLink.link}</a>
            </div>
          )}
          <div className="Community-Tags">
            {tags.map(tag => (
              <Tag key={`community-${tag}`} className="Community-Tag">
                {tag}
              </Tag>
            ))}
          </div>
          <div className="Community-Description">{community.description}</div>
          <ActivityAuthor
            user={community.owner.name}
            community={community.name}
            createdAt={community.ts}
          />
        </div>
        <Divider className="Community-Separator" type="vertical" />
        <div className="Community-Additional">
          {renderSocial(social)}
          <div className="Community-Participants">
            <p className="Community-ParticipantsTitle">Участники</p>
            <Participants data={participants} />
          </div>
        </div>
      </div>
      <Curl />
    </div>
  )
}

export default Community
