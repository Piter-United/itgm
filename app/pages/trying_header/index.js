import React from 'react'
import Header from '../../components/Header/Header'

/*

*/
const Trying = props => (
  <div>
    <h3>Main header</h3>
    <Header {...props} theme="dark" />
    <h3>light header</h3>
    <Header {...props} />
  </div>
)

export default Trying
