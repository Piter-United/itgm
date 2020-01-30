import React, { useState } from 'react'
import { Row, Col, Button, Icon } from 'antd'
import './title_filter_sort.css'
/*
 */
const Title = props => {
  const [Sort, setSort] = useState(props.sort)
  const [Filter, setFilter] = useState(false)
  const onClick = () => setFilter(!Filter)
  const onSort = () => {
    //check onSort in props
    props.onSort && props.onSort(!Sort)
    setSort(!Sort)
  }

  const onChange = ({ target }) => {
    const { value } = target
    props.onFilter(value)
  }

  return (
    <div className="title">
      <div className="title__wrapper">
        <div className="title__header">{props.name}</div>
        <span className="title__count">({props.counter})</span>
      </div>
      <div className="title__filter">
        {/* <input
          className="title__input"
          defaultValue={props.filter}
          onChange={onChange}
        /> */}
        <Icon className="title__icon" onClick={onClick} type="search" />
        {Sort ? (
          <Icon
            className="title__icon"
            onClick={onSort}
            type="sort-ascending"
          />
        ) : (
          <Icon
            className="title__icon"
            onClick={onSort}
            type="sort-descending"
          />
        )}
      </div>
    </div>
  )
}

export default Title
