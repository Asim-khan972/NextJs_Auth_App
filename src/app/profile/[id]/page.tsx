import React from 'react'

function UserProfile({params}:any) {
  return (
    <div>UserProfile

        <span>{params.id}</span>
    </div>
  )
}

export default UserProfile