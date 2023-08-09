import React from 'react'
import { useSelector } from "react-redux";


const PostAuthor = ({post}) => {

    const users = useSelector( state => state.users)
    const postAuthor = users.find( user => user.id === post.user).name

  return (
   <p> Post Author: {postAuthor}</p>
       
   
  )
}

export default PostAuthor

