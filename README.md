# Kolkata Dog Store

Website for Kolkata Dog Store, rebuilt with **React + Vite + Tailwind CSS**.

## Tech stack

- [Vite](https://vite.dev/) — build tool / dev server
- [React 18](https://react.dev/) (JavaScript / JSX)
- [React Router](https://reactrouter.com/) — client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) — styling (via `@tailwindcss/vite`)

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start dev server (http://localhost:5173)
npm run build   # build for production into dist/
npm run preview # preview the production build
```

## Project structure

```
src/
  main.jsx          # app entry, wraps App in BrowserRouter
  App.jsx           # routes + layout (Navbar / Footer)
  index.css         # Tailwind import + global styles
  components/
    Navbar.jsx      # responsive nav with mobile menu
    Footer.jsx
  pages/
    Home.jsx        # hero + features
    Products.jsx    # product grid (placeholder data)
    About.jsx
    Contact.jsx     # contact form
    NotFound.jsx    # 404
```

The product/content data is currently hard-coded placeholder data in each page —
swap it for real content (or an API) as the rebuild progresses.
