# HCI Blog

An Astro-based website for Human-Computer Interaction blog posts, slide presentations, and project documentation.

## Features

- **Blog**: Articles, research notes, and reflections on HCI methods and findings
- **Slide Presentations**: Interactive slides with reveal.js
- **Search**: Pagefind-powered search with full-text indexing

## Tech Stack

- Astro 5 with SSR (Vercel deployment)
- React 19 with Radix UI and Lucide icons
- TailwindCSS 4
- Reveal.js 5.2 for presentations
- Anime.js 4 for animations
- Pagefind for static search indexing

## Repository

https://github.com/weixuan0110/hci_blog

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build search index (runs automatically on build)
pnpm run build:search-index

# Code quality
pnpm run check
pnpm run fix

# Build for production (auto-builds search index)
pnpm run build
```

### Note

The search index is automatically built during production builds (via prebuild hook). For development, run `npm run build:search-index` manually to generate the search index.

## Content Structure

- **Knowledge Cards**: `src/content/cards/` - Research summaries in Markdown
- **Blog Articles**: `src/content/blogs/` - Long-form content
- **Slide Presentations**: `src/content/slides/` - Markdown-based slides for reveal.js
- **Doodles**: `src/content/doodles/` - Announcements with date ranges
