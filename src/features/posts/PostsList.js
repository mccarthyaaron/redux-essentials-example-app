import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'
import { fetchPosts } from './postsSlice'
import { useEffect } from 'react'
import PostExcerpt from './PostExcerpt'
import  { Spinner } from '../../components/Spinner'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => selectAllPosts(state) )

  const postStatus = useSelector(state => state.posts.status)
  const error = useSelector(state => state.posts.error)

  useEffect( ()=> {
    if(postStatus === 'idle' ) {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content;
  switch (postStatus) {
    case 'loading':
      content = <Spinner text="Loading..." />;
      break
    case 'succeeded':
      const orderedPosts = posts.slice().sort( (a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post => (
        <PostExcerpt key={post.id} post={post}/>
      ));
      break
    case 'failed':
      content = <div>{error}</div>
      break
    default:
      content = ''
 }



  

  


  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}