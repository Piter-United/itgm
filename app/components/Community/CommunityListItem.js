import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Typography, Row } from 'antd'
import './CommunityList.css'
import cn from 'classnames'

// const descStyle = {
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
//   display: '-webkit-box',
//   WebkitBoxOrient: 'vertical',
//   WebkitLineClamp: '2'
// }

class CommunityListItem extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      more: false,
      cls: cn('community-item__desc', 'community__desc_overflow')
    }
  }

  setMore = more => {
    // const style = more ? descStyle: { }
    const cls = more
      ? cn('community-item__desc')
      : cn('community-item__desc', 'community__desc_overflow')
    this.setState({ more, cls })
  }
  render() {
    const { state, setMore } = this
    const { id, name, description } = this.props

    return (
      <div className="community-item">
        <div className="community-item__header">
          <h3>
            <Link to={`/community/${id}`}>{name}</Link>
          </h3>
          <div className={state.cls}>{description}</div>
          <h4 className="community-item__more">
            <button onClick={() => setMore(!state.more)}>Подробнее</button>
          </h4>
        </div>
        <div className="community-item__img">
          <div>
            <Avatar size={80} src={`https://www.gravatar.com/avatar/`} />
          </div>
        </div>
      </div>
    )
  }
}

export default CommunityListItem
