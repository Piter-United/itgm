import React from 'react'
import UserMenu from '../../components/usermenu/usermenu'

const style = {
  backgroundColor: 'gray'
}
/*

*/
const Trying = props => (
  <div>
    <h3>User menu</h3>
    <div style={style}>
      <UserMenu {...props} theme="dark" />
    </div>
    <h3>light header</h3>
    <UserMenu {...props} />
  </div>
)

export default Trying
