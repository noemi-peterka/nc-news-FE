# NC News – Front End

🔗 Live Site: https://naominews.netlify.app

🔗 Back End Repository: https://github.com/noemi-peterka/back-end-nc-news

🔗 Front End Repository: https://github.com/noemi-peterka/nc-news-FE

## 📌 Overview

NC News is a responsive React application that allows users to browse, read, and interact with news articles.

Users can:

- View a list of articles

- Filter articles by topic

- Sort articles by date, comment count, or votes

- View individual articles

- Upvote articles and comments

- Post and delete comments (for the logged-in user)

- Navigate through paginated results

- Receive clear error messages for invalid routes, missing resources, or invalid form submissions

This project focuses on building a fully functional front end that interacts with a RESTful API.

## 🛠 Tech Stack

- React

- React Router

- Vite

- CSS (custom styling)

- Netlify (deployment)

## 🚀 How to Use the App

Browsing Articles

Visit the homepage to see the most popular articles.

Use the dropdown filters to sort by:

- Date

- Votes

- Comment count

- Filter by topic.

- Viewing an Article

- Click "Read More" to view the full article.

- Upvote articles.

- Toggle comments.

- Post a comment (must be logged in as the demo user).

- Error Handling

The app gracefully handles:

- Non-existent routes (404 page)

- Non-existent articles

- Non-existent topics

Users are shown clear, friendly messages instead of raw server errors.

## 💻 Running the Project Locally

1️⃣ Clone the repository

> git clone https://github.com/noemi-peterka/nc-news-FE.git
> 2️⃣ Navigate into the project directory
> cd nc-news-FE
> 3️⃣ Install dependencies
> npm install
> 4️⃣ Run the development server
> npm run dev

The app will run locally (usually at):

> http://localhost:5173

## 🔧 Build for Production

To create a production build:

> npm run build

To preview the production build locally:

> npm run preview

## 🧩 Back End API

This front end connects to a RESTful API built separately.

Back End Repository:
👉 https://github.com/noemi-peterka/back-end-nc-news

The API provides endpoints for:

- Articles

- Topics

- Comments

- Sorting & filtering

- Pagination

- Posting & deleting comments

## 📦 Minimum Node Version

This project requires:

> Node v20.x or higher

You can check your installed version using:

> node --version

## ✨ Future Improvements

- Potential future enhancements:
- User authentication
- Creating and deleting articles
- Comment sorting options
- Improved accessibility refinements
- Enhanced loading states and skeleton components
