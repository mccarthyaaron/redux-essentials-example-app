import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

export const PostsList = () => {
  const posts = useSelector(state => state.posts)
  
  const orderedPosts = posts.slice().sort( (a, b) => b.date.localeCompare(a.date))
  

  const renderedPosts = orderedPosts.map(post => (
      <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`posts/${post.id}`}>Go to full Post</Link> <br/>
      <Link to={`/editPosts/${post.id}`}>Edit post</Link>
      <PostAuthor post={post}/>
      <TimeAgo timeStamp={post.date}/>
      <ReactionButtons post={post} />

    </article>
    )
  )

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}