# Foodies - Next.js App

Foodies is a modern Next.js app that lets users share and browse delicious meal recipes.  
Built using Next.js App Router, React, and SQLite for persistent storage.

## Live Demo

Check out the live app here: [https://nextjs-foodies-app-router.vercel.app/](https://nextjs-foodies-app-router.vercel.app/)

## Features

- Share meals with title, summary, instructions, and an image.
- Browse all shared meals in a responsive grid layout.
- View detailed information for each meal, including creator info.
- Client-side validation with server-side verification.
- Image preview before uploading.
- Smooth UX with preserved form state on validation errors.
- Dynamic metadata for pages for SEO-friendly titles and descriptions.

## Tech Stack

- Next.js 13+ (App Router)
- React 18+
- SQLite (via `better-sqlite3`)
- Node.js File System API for image storage
- CSS Modules for styling

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-username>/nextjs-foodies-app.git
   cd nextjs-foodies-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This app is ready to deploy on [Vercel](https://vercel.com/) (already live!).  
Simply connect your GitHub repository to Vercel and it will handle the rest.

## Feature Improvements

Currently, uploaded images by users are stored in the `/public` folder.  
This means that when deploying to platforms like Vercel, images may not persist between deployments.

Future improvements could include:

- Storing uploaded images in a cloud file storage solution such as **AWS S3**, **Google Cloud Storage**, or **Cloudinary**.
- Updating the `saveMeal` function to upload images to the cloud and save the returned URL in the database.
- This ensures that user-uploaded images are reliably accessible even after deployments or server resets.

## Contributing

This project is a demo for learning purposes. Feel free to fork and experiment with it!

## Learning Resources

- **[React - The Complete Guide 2025 (including Next.js & Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)** course on Udemy, taught by **Maximilian Schwarzmüller**.

## License

MIT License
