import React from 'react'
import Header from '../../components/Header/Header'

const style = {
  backgroundColor: 'gray'
}
/*

*/
const Trying = props => (
  <div>
    <h3>Main header</h3>
    <div style={style}>
      <Header {...props} theme="dark" />
    </div>
    <h3>light header</h3>
    <Header {...props} />
  </div>
)

export default Trying
