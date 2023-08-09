import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
        <h3>{post.title}</h3>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <Link to={`posts/${post.id}`}>Go to full Post</Link> <br/>
        <Link to={`/editPosts/${post.id}`}>Edit post</Link>
        <PostAuthor post={post}/>
        <TimeAgo timeStamp={post.date}/>
        <ReactionButtons post={post} />
    </article>
  )
}

export default PostExcerpt