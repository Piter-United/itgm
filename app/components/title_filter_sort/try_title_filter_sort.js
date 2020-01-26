import React from 'react'

import Header from './title_filter_sort'
/*
 */
const data = {
  filter: '',
  name: 'Сообщества',
  counter: 12,
  onSort: console.log,
  onFilter: console.log
}

const Trying = props => (
  <div>
    <Header {...data} />
  </div>
)

export default Trying
