import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { postEdited } from './postsSlice'
import { useParams } from 'react-router-dom'

export const EditPostForm = () => {
    const { postId } = useParams();

    const post = useSelector( state => state.posts.find(post => post.id === postId));
    const dispatch = useDispatch()

    const [editedTitle, setEditedTitle] = useState(post.title)
    const [editedContent, setEditedTContent] = useState(post.content)

    function editPost(e) {
        e.preventDefault();
        dispatch(postEdited({
            id: postId,
            title: editedTitle,
            content: editedContent
        }))
        
    }

    if(!post) {
        return (
            <div>
                <br/>
                <h1>The post does not exist</h1>
            </div>
        )
    }


  return (
    <div style={{marginTop: '50px'}}>
        <h1>Edit Post</h1>
        <form onSubmit={editPost}>
            <input 
            type='text'
            id='editedPostTitle'
            placeholder='Edit Post Title'
            name='editedPostTitle'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea 
             id='editedPostContent'
             placeholder='Edit Post Content'
             name='editedPostContent'
             value={editedContent}
             onChange={(e) => setEditedTContent(e.target.value)}
            />
            
            <button onClick={editPost}>Submit changes</button>
            
        </form>

    </div>
    
  )
}

