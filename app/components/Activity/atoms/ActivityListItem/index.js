import React from 'react'
import cn from 'classnames'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { LIKE, UNLIKE } from 'store/activity'
import { List, Icon } from 'antd'
import history from '../../../../history'
import './style.css'

const onHandlerClick = (userId, item, dispatch) => {
  if (!userId) {
    return history.push('/login')
  }
  if (item.likes.isLike) {
    return dispatch(UNLIKE, item.likes.id)
  }
  return dispatch(LIKE, item.id)
}

export default ({ dispatch, item, userId }) => (
  <List.Item className="ActivityListItem" key={item.id}>
    <div>
      <div className="ActivityListItem-Misc">
        <span>{moment(item.ts).format('DD.MM.YYYY')}</span>
        <div>
          {item.community && item.community.resource && (
            <Link
              to={`/community/${item.community.id}`}
              className="ActivityListItem-Community"
            >
              {item.community.resource.name}
            </Link>
          )}
        </div>
      </div>
      <Link className="ActivityListItem-TitleLink" to={`/activity/${item.id}`}>
        {item.resource.name}
      </Link>
    </div>
    <div className="ActivityListItem-Description">
      {item.resource.description}
      <span className="ActivityListItem-DescriptionFade" />
    </div>
    <div className="ActivityListItem-Footer">
      <div className="ActivityListItem-Likes" key={`list-item-like-${item.id}`}>
        <Icon
          onClick={() => onHandlerClick(userId, item, dispatch)}
          type="heart"
          theme={item.likes.isLike ? 'filled' : ''}
          className={cn({
            'ActivityListItem-LikeIcon': true,
            'ActivityListItem-LikeIcon_islike_true': item.likes.isLike
          })}
        />{' '}
        <span className="ActivityListItem-LikeCounter">{`(${item.likes.count})`}</span>
      </div>
      <span className="ActivityListItem-Author">
        Автор: {item.resource.user.name}
      </span>
    </div>
  </List.Item>
)
