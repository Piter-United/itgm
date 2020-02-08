import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Typography, Row } from 'antd'
import './CommunityList.css'
import cn from 'classnames'

class CommunityListItem extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      more: false,
      cls: cn('community-item__desc', 'community__desc_overflow')
    }
    this.setMore = this.setMore.bind(this)
  }

  setMore(more) {
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
        <div className="community-item__wrapper">
          <h3 className="community-item__header">
            <Link to={`/community/${id}`} className="community-item__link">
              {name}
            </Link>
          </h3>
          <div className={state.cls}>{description}</div>
          <h4 className="community-item__datails">
            <button
              className="community-item__button"
              onClick={() => setMore(!state.more)}
            >
              Подробнее
            </button>
          </h4>
        </div>
        <div className="community-item__img"></div>
      </div>
    )
  }
}

export default CommunityListItem
