# Assinae Front

Frontend organizado com Next.js, Tailwind CSS e Material UI.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS framework
- **Material UI v9** - React component library
- **Geist Fonts** - Optimized fonts from Vercel

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components
│   ├── layout/    # Layout components
│   └── ui/        # Reusable UI components
├── features/      # Feature-based modules
├── hooks/         # Custom React hooks
├── lib/           # Library configurations (theme, etc.)
├── providers/     # React context providers
├── services/      # API service layer
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── constants/     # Application constants
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

See `.env.example` for available environment variables:
- `NEXT_PUBLIC_API_URL` - API base URL
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXTAUTH_SECRET` - NextAuth secret key

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Material UI Documentation](https://mui.com/material-ui/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
