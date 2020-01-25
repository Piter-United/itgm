import React from 'react'
import { withRouter, Link, matchPath } from 'react-router-dom'
import useStoreon from 'storeon/react'
import { Button, Layout, Tooltip } from 'antd'
import CustomIcon from 'ui/CustomIcon'

const { Footer } = Layout

const hasMatchRoute = (path, url, exact = true) => {
  const m = matchPath(path, {
    path: url,
    exact,
    strict: false
  })
  return m && 'path' in m
}

export default withRouter(
  ({
    history: {
      location: { pathname: path }
    }
  }) => {
    const icons = ['vk', 'facebook', 'instagram', 'twitter']
    const links = []
    return (
      <Footer>
        {icons.map(key => (
          <Tooltip title={[key]} key={[key]}>
            <Button shape="circle">
              <CustomIcon type={[key]} />
            </Button>
          </Tooltip>
        ))}
      </Footer>
    )
  }
)
