import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState =[
    {
        id: '1',
        title: 'First Post!', 
        content: 'Hello!',
        user: 'mc',
        date: sub(new Date(), { minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        }
    },
    {   id: '2', 
        title: 'Second Post', 
        content: 'More text',
        user: 'mc',
        date: sub(new Date(), { minutes: 5}).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        }
    }
]


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer:  (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, userId, date) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                }
            },
        },
        postEdited: (state, action) => {
            const index = state.findIndex( post => post.id === action.payload.id);
            state[index].title = action.payload.title;
            state[index].content = action.payload.content;
        },
        postReactionAdded: (state, action) => {
            const  {postId, symbolName } = action.payload;
            const index = state.findIndex( post => post.id === postId);
            state[index].reactions[symbolName] += 1
            return
        }
    }
})

export const { postAdded, postEdited, postReactionAdded } = postsSlice.actions

export default postsSlice.reducer