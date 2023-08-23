import { Avatar } from 'antd'
import React from 'react'

function HeaderComponent()
{
  return (
    <div className='row' style={{
      padding: `10px 20px`
    }}>
      <div className='col'>
        <h5>Title</h5>
      </div>


      <Avatar />

    </div>
  )
}

export default HeaderComponent