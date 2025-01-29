const { test, expect, beforeEach, describe } = require('@playwright/test')
const axios = require('axios')

const login = async (page, username, password) => {
    const user_input = await page.getByTestId('Username input')
    const pass_input = await page.getByTestId('Password input')
    const login_button = await page.getByText('Login')

    await user_input.fill(username)
    await pass_input.fill(password)
    await login_button.click()
}

const create_blog = async (page, title, author, url) => {
    const title_input = await page.getByPlaceholder("Blog's Title")
    const author_input = await page.getByPlaceholder('Author')
    const url_input = await page.getByPlaceholder("Blog's Url")

    await title_input.fill(title)
    await author_input.fill(author)
    await url_input.fill(url)
    await page.getByRole('button').and(page.getByText('Create')).click()
}

test('front page can be opened', async({ page }) => {
    await page.goto('http://localhost:5173');

    const locator = await page.getByRole('heading', { level: 1});
    await expect(locator).toBeVisible();
})

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await axios.post('http://localhost:5173/api/testing/reset')
        await axios.post('http://localhost:3003/api/users', {
            name: 'Fernando',
            username: 'Pleskar3',
            password: 'papilla'
            
        })
        await page.goto('http//localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const user_input = await page.getByTestId('Username input')
        const pass_input = await page.getByTestId('Password input')

        await expect(user_input).toBeVisible()
        await expect(pass_input).toBeVisible()
    })

    describe('Login tests', () => {
        test('succeeds with correct credentials', async ({ page }) => {
          await login(page, 'Pleskar3', 'papilla')

          await expect(page.getByText('Pleskar3 succesfully Logged in!')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await login(page, 'Fernandito69', 'elRicoPollo')

            await expect(page.getByText('The Username or Password are wrong')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            login(page, 'Pleskar3', 'papilla')
        })

        test('a new blog can be created', async({ page }) => {
            await page.getByRole('button').and(page.getByText('Create a new Blog!')).click()
            await create_blog(page, 'Regla 213 del Capitanazo', 'El Capitanazo', 'example.com')

            await expect(page.getByText('A new blog "Regla 213 del Capitanazo" by El Capitanazo was Succesfully added!')).toBeVisible()
            await expect(page.getByText('Regla 213 del Capitanazo by El Capitanazo')).toBeVisible()
        })
    })

    // Because this project doesn't have the function to edit the Blog's title, author, or URL, we are testing that the blog can be "edited" by updating its likes.
    describe('Edit the blogs', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'Pleskar3', 'papilla');
            await page.getByRole('button').and(page.getByText('Create a new Blog!')).click();
            await create_blog(page, 'Regla 213 del Capitanazo', 'El Capitanazo', 'example.com');
        })
        
        test('Like a blog one time', async ({ page }) => {
            await page.getByRole('button', { name: 'Show more'}).click();
            await page.getByRole('button', {name: 'Like'}).click();

            await expect(page.getByText('Likes: 1')).toBeVisible();
        })
    })

    describe('Delete a blog', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'Pleskar3', 'papilla')
            await page.getByRole('button').and(page.getByText('Create a new Blog!')).click()
            await create_blog(page, 'Regla 213 del Capitanazo', 'Pleskar3', 'example.com')
        })

        test('Delete a Blog', async ({ page }) => {
            page.on('dialog', async dialog => {
                await dialog.accept();
            });

            const loggedInUser = await page.getByText('Pleskar3');
            expect(loggedInUser).toBeTruthy();

            await page.getByRole('button', {name:'Show more'}).click()
            await page.getByRole('button', {name:'Delete'}).click()

            await page.waitForSelector('text=Regla 213 del Capitanazo by Pleskar3', { state: 'detached' });

            await expect(page.getByText('Regla 213 del Capitanazo by Pleskar3')).not.toBeVisible()
        })
    })

    describe('Only the creator can see the Delete Button', () => {
        test('Others users cant see the button', async ({page }) => {
            await login(page, 'Pleskar3', 'papilla');
            await page.getByRole('button').and(page.getByText('Create a new Blog!')).click();
            await create_blog(page, 'Regla 213 del Capitanazo', 'Pleskar3', 'example.com');

            await page.waitForSelector('text=Regla 213 del Capitanazo by Pleskar3');

            await page.getByRole('button', {name: 'Logout'}).click()
            await axios.post('http://localhost:3003/api/users', {
                name: 'Another user',
                username: 'anotheruser',
                password: 'password'
            })
            await login(page, 'anotheruser', 'password');

            await page.waitForSelector('text=Regla 213 del Capitanazo by Pleskar3');

            await page.getByRole('button', { name: 'Show more' }).click()
            await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
        })
    })

    describe('Blogs are ordered', () => {
        test('Blogs are ordered by likes', async ({ page }) => {
            await login(page, 'Pleskar3', 'papilla')
            await page.getByRole('button').and(page.getByText('Create a new Blog!')).click();
            
            await create_blog(page, 'Blog 1', 'Author 1', 'url1.com');
            await page.waitForSelector('text=Blog 1 by Author 1');

            await create_blog(page, 'Blog 2', 'Author 2', 'url2.com');
            await page.waitForSelector('text=Blog 2 by Author 2');

            await create_blog(page, 'Blog 3', 'Author 3', 'url3.com');
            await page.waitForSelector('text=Blog 3 by Author 3');

            const showMoreButtons = await page.$$('button:has-text("Show more")')
            for (const button of showMoreButtons) {
                await button.click()
            }

            const likesButtons = await page.$$('button:has-text("Like")')
            await page.waitForSelector('button:has-text("Like")');
            await likesButtons[2].click()
            await page.waitForSelector('text=Likes: 1');

            const blogContainers = await page.$$('div[style*="border: 1px solid"]');
            console.log(blogContainers.length)
            const likes = []

            for (const container of blogContainers) {
                const likesText = await container.$eval('div:has-text("Likes:")', el => el.textContent);
                const numberOfLikes = parseInt(likesText.match(/\d+/)[0]);
                likes.push(numberOfLikes)
            }
            console.log(likes)

            expect(likes).toEqual([...likes].sort((a, b) => b - a));
        })
    })
})