import React from 'react'
import MainMenu from '../../components/Mainmenu/Mainmenu'

const style = {
  backgroundColor: 'gray'
}
/*

*/
const Trying = props => (
  <div>
    <h3>main menu</h3>
    <div style={style}>
      <MainMenu {...props} theme="dark" />
    </div>
    <h3>light main menu</h3>
    <MainMenu {...props} />
  </div>
)

export default Trying
