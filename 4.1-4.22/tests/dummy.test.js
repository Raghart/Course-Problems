const { test, describe, after, beforeEach, before } = require('node:test');
const Blog = require('../models/blog-model.js')
const User = require('../models/user-model.js')
const mongoose = require('mongoose')
const assert = require('node:assert');
const {dummy , totalLikes, favoriteBlog, mostBlogs, mostLikes, test_blogs} = require('../utils/list_helper');
const supertest = require('supertest');
const app = require('../index');
const api = supertest(app);



before(async () => {
    if (mongoose.connection.readyState === 0) {
        console.log('Connecting to the DB')
        await mongoose.connect(process.env.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
});

beforeEach(async () => {
    await User.deleteMany({})
    const test_user = {
        "username": "Pleskar",
        "name": "Fernando",
        "password": "Escondere_a_mi_novia_en_el_sotano_durante_10_anos"
    }
    const newUser = new User(test_user)
    await newUser.save();
})

describe('Users first group of tests', () => {
    test('Unique Username', async () => {
        const test_user = {
            "username": "Pleskar",
            "name": "Fernando",
            "password": "Escondere_a_mi_novia_en_el_sotano_durante_10_anos"
        
        }

        const result = await api.post('/api/users')
            .send(test_user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('The username must be unique!'))
    })

    test('Short password', async () => {
        const test_user = {
            "username": "Pleskar",
            "name": "Fernando",
            "password": "10"
        
        }
        const result = await api.post('/api/users')
        .send(test_user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('The password must have at least 3 characters'))
    })

    test('Password and username empty', async () => {
        const test_user = {
            "username": "",
            "name": "Fernando",
            "password": ""
        
        }
        const result = await api.post('/api/users')
        .send(test_user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Username and password are required'))
    })
})

after(async () => {
    await mongoose.connection.close();
})
/*

beforeEach(async () => {
    console.log('Deleting DB')
    await Blog.deleteMany({});
    const test_blogs = [
        { title: 'Blog 1', author: 'Author 1', url: 'http://example.com/1', likes: 1 },
        { title: 'Blog 2', author: 'Author 2', url: 'http://example.com/2', likes: 2 },
        { title: 'Blog 3', author: 'Author 3', url: 'http://example.com/3', likes: 3 }
    ];

    for (let blog of test_blogs) {
        let blogObject = new Blog(blog);
        console.log('Adding to the DB')
        await blogObject.save();
    }
});

describe('First group of test: Blog as Json', () => {
    test('blogs are returned as json', async () => {
        const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    
        assert.strictEqual(response.body.length, 3)
    });    
})

describe('Second group of test: Blog model', () => {
    test('id property', async () => {
        const blog = new Blog(test_blogs[0])
        const jsonBlog = blog.toJSON()
        assert.strictEqual(jsonBlog.id, blog._id.toString())
        assert.strictEqual(jsonBlog._id, undefined)
    });    
})

describe('Third group of test: Blog post', () => {
    test('Blog post', async () => {
        const newBlog = {
            title: 'New Blog',
            author: 'Author',
            url: 'http://newblog.com',
            likes: 5
        };

        const starting_blogs = await Blog.find({})
        
        await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const after_blogs = await Blog.find({});
        assert.strictEqual(after_blogs.length, starting_blogs.length + 1)

        const titles = after_blogs.map(blog => blog.title)
        assert(titles.includes('New Blog'))
    });    
})

describe('4th group of test: Like missing', () => {
    test('Like missing', async () => {
        const liked_blog = {
            title: 'Like missing',
            author: 'Author',
            url: 'http://newblog0.com',
        };
        
        await api.post('/api/blogs')
        .send(liked_blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

        const blogs = await Blog.find({})
        const added_blog = blogs.find(blog => blog.title === 'Like missing')

        assert.strictEqual(added_blog.likes, 0)
    });    
})

describe('5th group of test: Title or Url missing', () => {
    test('Title missing', async () => {
        const title_blog = {
            author: 'Author',
            url: 'http://newblog0.com',
        };
        
        await api.post('/api/blogs')
        .send(title_blog)
        .expect(400)
    });

    test('Url missing', async () => {
        const url_blog = {
            title: 'Like missing',
            author: 'Author'
        }

        await api.post('/api/blogs')
        .send(url_blog)
        .expect(400)
    })
})

describe('Deleting a blog', () => {
    test('Delete a single Blog', async () => {
        const blog_delete = {
            title: 'Blog to be deleted',
            author: 'Author',
            url: 'http://newblogtodelete.com',
        }
        const response = await api.post('/api/blogs')
        .send(blog_delete)
        .expect(201)

        const res = await api.delete(`/api/blogs/${response.body.id}`)
        assert.strictEqual(res.status, 204)
    })
})

describe('Updating a blog', () => {
    test('Update a single Blog', async () => {
        const blog_update = {
            title: 'Blog to be updated',
            author: 'Author',
            url: 'http://newblogtodelete.com',
        }
        const response = await api.post('/api/blogs')
        .send(blog_update)
        .expect(201)

        const likes_update = {likes: 30}

        const res = await api.put(`/api/blogs/${response.body.id}`)
        .send(likes_update)
        .expect(200)

        assert.strictEqual(res.body.likes, 30)
    })

    test('Update a nonexisting single Blog', async () => {
        await api.put('/api/blogs/non_exstingID')
        .send({likes: 30})
        .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close();
});

/*

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test2('when list is empty, equals zero', () => {
        const result = totalLikes([]);
        assert.strictEqual(result, 0);
    })
    
    test2('Multiple blogs sum', () => {
        const result = totalLikes(test_blogs);
        assert.strictEqual(result, 36);
    })
})

describe('Favorite Blog', () => {
    test2('None blogs', () => {
        const result = favoriteBlog([]);
        assert.strictEqual(result, null)
    })

    test2('Multiple blogs test to find the most liked one', () => {
        const result = favoriteBlog(test_blogs);
        assert.deepStrictEqual(result, {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        })
    })
})

describe('Most Blogs', () => {
    test2('None blogs', () => {
        const result = mostBlogs([]);
        assert.strictEqual(result, null)
    })

    test2('Multiple blogs test', () => {
        const result = mostBlogs(test_blogs);
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        })
    })
})

describe('Most Likes', () => {
     test2('None Blogs', () => {
        const result = mostLikes([])
        assert.strictEqual(result, null)
     })

     test2('More Blogs', () => {
        const result = mostLikes(test_blogs)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
     })
})

*/