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
- Uploaded images are stored in **Cloudinary**, ensuring persistence across deployments.

## Tech Stack

- Next.js 13+ (App Router)
- React 18+
- SQLite (via `better-sqlite3`)
- Cloudinary for image storage
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

3. Set up environment variables for Cloudinary in a `.env.local` file:

   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This app is ready to deploy on [Vercel](https://vercel.com/) (already live!).  
Simply connect your GitHub repository to Vercel and it will handle the rest.

Cloudinary ensures that user-uploaded images remain accessible even after deployments or server resets.

## Feature Improvements

- All user-uploaded images are uploaded to the Cloudinary `foodies_app` folder.
- `saveMeal` function handles temporary local storage, Cloudinary upload, and database insertion seamlessly.
- Cloud-based image storage improves reliability and scalability compared to local `/public` storage.

## Contributing

This project is a demo for learning purposes. Feel free to fork and experiment with it!

## Learning Resources

- **[React - The Complete Guide 2025 (including Next.js & Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)** course on Udemy, taught by **Maximilian Schwarzmüller**.

## License

MIT License
