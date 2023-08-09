import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
// import { sub } from "date-fns";
import { client } from '../../api/client';


const initialState = {
    posts: [],
    status: 'idle',
    // loading, succeeded, failed
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost );
    return response.data
})




const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer:  (state, action) => {
                state.posts.push(action.payload)
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
            const index = state.posts.findIndex( post => post.id === action.payload.id);
            state.posts[index].title = action.payload.title;
            state.posts[index].content = action.payload.content;
        },
        postReactionAdded: (state, action) => {
            const  { postId, symbolName } = action.payload;
            const index = state.posts.findIndex( post => post.id === postId);
            state.posts[index].reactions[symbolName] += 1
            return
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.posts = state.posts.concat(action.payload)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            } )
            // .addCase(addNewPost.pending, (state, action)=> {
            //     state.status = 'loading'
            // })
            .addCase(addNewPost.fulfilled, (state, action)=> {
                state.status = 'succeeded'
                state.posts.push(action.payload)
            })
            // .addCase(addNewPost.fulfilled, (state, action)=> {
            //     state.status = 'failed'
            //     state.error = action.error.message
            // })
    },
})

export const { postAdded, postEdited, postReactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find( post => post.id === postId)



// {
//     id: '1',
//     title: 'First Post!', 
//     content: 'Hello!',
//     user: 'mc',
//     date: sub(new Date(), { minutes: 10}).toISOString(),
//     reactions: {
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0
//     }
// },
// {   id: '2', 
//     title: 'Second Post', 
//     content: 'More text',
//     user: 'mc',
//     date: sub(new Date(), { minutes: 5}).toISOString(),
//     reactions: {
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0
//     }
// }