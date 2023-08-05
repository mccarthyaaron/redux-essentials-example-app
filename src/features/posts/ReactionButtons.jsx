import React from 'react'
import { useDispatch } from 'react-redux'
import { postReactionAdded } from './postsSlice';

const ReactionButtons = ({ post }) => {

    const dispatch = useDispatch(0);

    const reactionEmoji = {
        thumbsUp: '👍',
        hooray: '🎉',
        heart: '❤️',
        rocket: '🚀',
        eyes: '👀'
    }
    
    function handleReactions(name) {
        console.log(name, post.title )
        dispatch(postReactionAdded({
            postId: post.id,
            symbolName: name
        }))
    }
    
    const reactionButtons = Object.entries(reactionEmoji).map( array => {
        const [name, emoji] = array
        return (
            <button 
                className="muted-button reaction-button" 
                key={name} 
                onClick={() => handleReactions(name)}>
                {emoji} {post.reactions[name]}
            </button>
        )
    })

  return (
    <div>
        {reactionButtons}
    </div>
  )
}

export default ReactionButtons