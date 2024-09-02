import React from 'react'

const UserProfile = ({params}: any) => {
  return (
    <div>{params.id}</div>
  )
}

export default UserProfile