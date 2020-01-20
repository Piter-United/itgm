import React, { useEffect } from 'react'

import './Member.css'

const Member = (type, src) => (
  <div class="root">
    <img src={src} style={{ width: '80px', height: '80px' }} />
    <div>
      <div class="name">
        <p class="firstName">Иван</p>
        &#160;
        <p class="secondName">Иванов</p>
      </div>
      <p class="community">PiterJS</p>
    </div>
  </div>
)

export default Member
