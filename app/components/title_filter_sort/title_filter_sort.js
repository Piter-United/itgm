import React, { useState } from 'react'
import { Row, Col, Button, Icon } from 'antd'
/*
 */
const Header = props => {
  const [Sort, setSort] = useState(props.sort)
  const [Filter, setFilter] = useState(false)
  const onClick = () => setFilter(!Filter)
  const onSort = () => {
    props.onSort && props.onSort(!Sort)
    setSort(!Sort)
  }
  const onChange = ({ target }) => {
    const { value } = target
    props.onFilter(value)
  }

  return (
    <Row>
      <Col span={12}>
        {Filter ? (
          <input defaultValue={props.filter} onChange={onChange} />
        ) : (
          <h3>
            {props.name}
            <span>({props.counter})</span>
          </h3>
        )}
      </Col>
      <Col span={12}>
        <Icon onClick={onClick} type="search" />
        {Sort ? (
          <Icon onClick={onSort} type="sort-ascending" />
        ) : (
          <Icon onClick={onSort} type="sort-descending" />
        )}
      </Col>
    </Row>
  )
}

export default Header
