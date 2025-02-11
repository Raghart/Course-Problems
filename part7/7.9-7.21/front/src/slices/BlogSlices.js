import { createSlice } from "@reduxjs/toolkit";
import requestService from "../services/services"
import { ShowNotification } from "./NotifSlices";

const BlogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs: (state, action) => action.payload,
        AddBlog: (state, action) => [...state, action.payload],
        Like: (state, action) => {
            const blog = state.find(blog => blog.id === action.payload.id)
            blog.likes += 1
        },
        Erase: (state, action) => {
            const Index = state.findIndex(blog => blog.id === action.payload.id)
            state.splice(Index, 1)
        },
        Comment: (state, action) => {
            console.log(action)
            const UpdateBlog = state.find(blog => blog.id === action.payload.id)
            UpdateBlog.comments.push(action.payload.comment)
        }
    }
})

export const { setBlogs, AddBlog, Like, Erase, Comment } = BlogSlice.actions;

export const GetBlogs = () => {
    return async dispatch => {
        const blogs = await requestService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const AppendBlog = (newBlog) => {
    return async dispatch => {
        const createdBlog = await requestService.createBlog(newBlog);
        dispatch(AddBlog(createdBlog))
    } 
}

export const LikeBlog = (blog) => {
    return async dispatch => {
      const response = await requestService.putLike(blog);
      dispatch(Like(response))
    }
};

export const DeleteBlog = (blog) => {
    return async dispatch => {
        window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`);
        await requestService.deleteBlog(blog);
        dispatch(Erase(blog))
        dispatch(ShowNotification("The blog has been successfuly deleted it!", 5000))
    }
};

export const AddComment = (comment, BlogID) => {
    return async dispatch => {
        const NewComment = {
            id: BlogID,
            comment: comment
        }
        await requestService.PostComment(NewComment)
        dispatch(Comment(NewComment))
    }
}

export default BlogSlice.reducer