import React from 'react'

import classNames from 'classnames'

/*

*/
const Trying = props => {
  const { theme } = props
  const searchClass = classNames(
    'main-nav__search',
    theme === 'dark' ? 'main-nav__search--theme-dark' : ''
  )
  const notificationClass = classNames(
    'main-nav__notification',
    theme === 'dark' ? 'main-nav__notification--theme-dark' : ''
  )
  const avatarClass = classNames(
    'main-nav__avatar',
    theme === 'dark' ? 'main-nav__avatar--theme-dark' : ''
  )

  return (
    <div>
      <div className="main-nav__user-menu">
        <button type="button" className={searchClass} />
        <button type="button" className={notificationClass} />
        <button type="button" className={avatarClass} />
      </div>
    </div>
  )
}

export default Trying
