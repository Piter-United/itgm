import React from 'react'

import { Breadcrumb } from 'antd'

export const Breadcrumbs = ({ viewPath, path }) => (
  <Breadcrumb>
    <Breadcrumb.Item>
      <a href={path}>{viewPath}</a>
    </Breadcrumb.Item>
  </Breadcrumb>
)
