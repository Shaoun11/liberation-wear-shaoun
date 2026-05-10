# Muktijuddho Memory Archive

A basic responsive static website for a digital archive about the Bangladesh Liberation War of 1971.

## Features

- Homepage with archive introduction and featured sections
- Historical document catalog with category filters and detail view
- Interview collection with biography, testimony summary, and audio players
- Photograph gallery with category filters, zoom preview, and download links
- Contact and contribution form with file upload field
- SEO meta tags and JSON-LD structured data
- Responsive layout for desktop, tablet, and mobile
- Netlify-ready static deployment setup

## Files

- `index.html` - website structure and SEO metadata
- `styles.css` - responsive design and layout
- `script.js` - filters, document details, gallery zoom, mobile menu, and form behavior
- `netlify.toml` - static hosting and security headers

## Run Locally

Open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Deploy

This project is ready for static hosting. No build command is required.

### Netlify Settings

- Build command: leave empty
- Publish directory: `.`

### Local Secure Server Note

For HTTPS on a local machine, place these static files behind a local server such as Caddy, Nginx, Apache, or a hosting platform that provides HTTPS certificates.
