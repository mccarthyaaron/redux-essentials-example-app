import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'



export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('error')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch();
  const users = useSelector( state => state.users);

  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  async function onSubmit(e) {    
    e.preventDefault();
    if(title && content) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId})).unwarap();
        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.error('failed to save the post:', error)
        setAddRequestStatus('failed')
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map( (user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const buttonDisabled = title && content && userId ? false : true

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />

        <label htmlFor="postAuthor">Post Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option></option>
          {usersOptions}
        </select>

        <button type="submit" disabled={buttonDisabled}>Save Post</button>
      </form>
    </section>
  )
}