import React from 'react'
import './style.css'

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

const CommunitySocial = ({ data = [] }) => {
  if (data.length === 0) return null
  return (
    <div className="Community-Social">
      <div className="Community-SocialTitle">Сообщество в интернете</div>
      {data.map(social => (
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
}

export default CommunitySocial
