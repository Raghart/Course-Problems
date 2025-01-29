import { render, screen, waitFor } from  '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event';
import { putLike, createBlog } from '../services/services';
import { expect } from 'vitest';
import CreateBlog from './CreateBlog';

vi.mock('../services/services', () => ({
    putLike: vi.fn().mockResolvedValue({
      id: '123',
      title: 'Test blog',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 6
    }),
    createBlog: vi.fn().mockResolvedValue({
      title: 'Test blog',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 0
    })
  }));

const LikeBlog = async (blog, setBlogs, blogs) => {
    try {
      const response = await putLike(blog);
      setBlogs(blogs.map(b => b.id === blog.id ? response : b));
    } catch (error) {
      console.log('Error Liking the blog:', error);
    }
};

test('Blog shows title and author', () => {
    const blog = {
        title: 'Test blog',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 5
    };

    render(<Blog blog={blog} setBlogs={() => {}} blogs={[]} setMessage={() => {}}/>)

    expect(screen.getByText('Test blog by Test Author')).toBeInTheDocument();
    expect(screen.queryByText('http://testurl.com')).not.toBeInTheDocument();
    expect(screen.queryByText('Likes: 5')).not.toBeInTheDocument();
})

test('Blog shows url and likes when button is clicked', async () => {
    const blog = {
        title: 'Test blog',
        author: 'Test Author',
        url: 'http://testurl.com',
        likes: 5
    };

    render(<Blog blog={blog} setBlogs={() => {}} blogs={[]} setMessage={() => {}}/>)

    const user = userEvent.setup()
    const button = screen.getByText('Show more')
    await user.click(button)

    expect(screen.getByText('Url: http://testurl.com')).toBeInTheDocument();
    expect(screen.getByText('Likes: 5')).toBeInTheDocument();
});

test('Blog clicks button twice', async () => {
    const blogs = [
        { id: '123', title: 'Test blog', author: 'Test Author', url: 'http://testurl.com', likes: 5 }
      ];
      const setBlogs = vi.fn();
    
      await LikeBlog(blogs[0], setBlogs, blogs);
      await LikeBlog(blogs[0], setBlogs, blogs);
    
      expect(putLike).toHaveBeenCalledTimes(2);
      expect(setBlogs).toHaveBeenCalledWith([
        { id: '123', title: 'Test blog', author: 'Test Author', url: 'http://testurl.com', likes: 6 }
      ]);
});

test('Submit the form of a blog', async () => {
    const setMessage = vi.fn();
    const setBlogs = vi.fn();
    const blogs = [];

    render(<CreateBlog setMessage={setMessage} blogs={blogs} setBlogs={setBlogs}/>)

    const title_input = screen.getByPlaceholderText("Blog's Title")
    const author_input = screen.getByPlaceholderText("Author")
    const url_input = screen.getByPlaceholderText("Blog's Url")
    const create_button = screen.getByText('Create')

    await userEvent.type(title_input, 'Test blog')
    await userEvent.type(author_input, 'Test Author')
    await userEvent.type(url_input, 'http://testurl.com')
    await userEvent.click(create_button)

    await waitFor(() => {
        expect(createBlog).toHaveBeenCalledTimes(1);
        expect(createBlog).toHaveBeenCalledWith({
            title: 'Test blog',
            author: 'Test Author',
            url: 'http://testurl.com'
        });
    });
});