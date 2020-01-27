import React, { useEffect } from 'react'
import useStoreon from 'storeon/react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer/Footer'

import { Spin, Tag, Divider } from 'antd'

import { GET_BY_ID } from 'store/community'

import './Community.css'
import PenIcon from '../../asset/Pen.svg'
import VkIcon from '../../asset/communityVk.svg'
import TwitterIcon from '../../asset/twitter.svg'
import FacebookIcon from '../../asset/fb.svg'
import GithubIcon from '../../asset/github.svg'
import InstagramIcon from '../../asset/insta.svg'
import LinkedInIcon from '../../asset/linkedin.svg'
import YoutubeIcon from '../../asset/linkedin.svg'

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
  const global = community.social.filter(s => s.icon === 'global')[0]
  const tags = ['Tag 1', 'UX Analytics', 'tag 3']

  const communityCreateDate = new Date(community.ts)
  const normalizeNum = (num, size) => {
    let string = num.toString()
    while (string.length < size) string = '0' + string
    return string
  }
  const communityCreateYear = communityCreateDate
    .getFullYear()
    .toString()
    .substr(2, 2)
  const communityCreateMonth = normalizeNum(
    communityCreateDate.getMonth().toString(),
    2
  )
  const communityCreateCalendarDay = normalizeNum(
    communityCreateDate.getDay().toString(),
    2
  )
  const communityCreateHours = communityCreateDate.getHours().toString()
  const communityCreateMinutes = communityCreateDate.getMinutes().toString()
  const communityCreateDateString = `Создана ${communityCreateCalendarDay}.${communityCreateMonth}.${communityCreateYear} в ${communityCreateHours}:${communityCreateMinutes}`

  const renderSocial = socialData =>
    socialData.length == 0 ? null : (
      <div className="Community-Social">
        <div className="Community-SocialTitle">Сообщество в интернете</div>
        {social.map(social => (
          <a
            style={{
              marginRight: 10,
              width: '45px',
              display: 'inlineBlock'
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
      <Header />
      <div className="Community-All">
        <div className="Community-Path">
          <Link style={{ color: 'black' }} to="/community">
            /Сообщества
          </Link>
        </div>
        <div className="Community-Body">
          <div className="Community-Content">
            <div className="Community-HeaderContainer">
              <h2 className="Community-Header">{community.name}</h2>
              {userId === community.owner.id ? (
                <Link
                  style={{ lineHeight: '48px' }}
                  to={`/community/${id}/edit`}
                >
                  <PenIcon />
                </Link>
              ) : null}
            </div>
            {global && (
              <div className="Community-Link">
                <a href={global.link}>{global.link}</a>
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
            <div className="Community-CreatorContainer">
              <div className="Community-CreatorAvatar"></div>
              <div>
                <div className="Community-CreatorRequisites">{`${community.owner.name}, ${community.name}`}</div>
                <div className="Community-CreatorDate">
                  {communityCreateDateString}
                </div>
              </div>
            </div>
          </div>
          <Divider className="Community-Separator" type="vertical" />
          <div className="Community-Additional">
            {renderSocial(social)}
            <div className="Community-Participants">
              {/* for participants */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Community
