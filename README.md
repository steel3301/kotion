# Kotion

Kotion is a Notion-inspired document workspace built with Next.js. Users can create nested documents, edit rich block content, add icons and cover images, organize pages in a sidebar, and publish read-only previews.

## Features

- Clerk authentication for workspace access.
- Convex queries and mutations for reactive document data.
- Nested documents, search, archive/trash, restore, and permanent deletion.
- BlockNote rich-text editing with headings, lists, and other block types.
- Debounced content saves to Convex.
- EdgeStore uploads for cover images and editor images, including cover replacement.
- Public, read-only previews for published, unarchived documents.
- Light, dark, and system theme selection.

## Stack

- Next.js App Router and React
- TypeScript and Tailwind CSS 4
- Clerk authentication
- Convex database and server functions
- BlockNote with the Shadcn UI adapter
- EdgeStore object storage

## Requirements

- Node.js 20.18 or later
- npm
- Clerk, Convex, and EdgeStore development accounts/configuration

## Local Setup

1. Install dependencies:

   ```bash
   npm ci
   ```

2. Configure the environment variables in `.env.local` (do not commit this file):

   ```dotenv
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=
   NEXT_PUBLIC_CONVEX_SITE_URL=

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   CLERK_FRONTEND_API_URL=
   CLERK_JWT_ISSUER_DOMAIN=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/documents
   NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/documents

   EDGE_STORE_ACCESS_KEY=
   EDGE_STORE_SECRET_KEY=
   ```

   Get the Clerk values from the Clerk dashboard. Configure the same Clerk JWT issuer domain for Convex authentication in `convex/auth.config.ts`. Convex CLI may create or manage the deployment variables when you connect the project.

   Configure EdgeStore credentials from your EdgeStore project. Keep all secret values private and use separate credentials for development and production.

3. Start Convex in one terminal and follow its prompts to connect or create a development deployment:

   ```bash
   npx convex dev
   ```

4. Start Next.js in another terminal:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Sign in through Clerk, create a document, and use its toolbar to edit content, upload a cover, or publish a preview.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve a production build. |
| `npm run lint` | Run ESLint. |
| `npx tsc --noEmit` | Run the TypeScript check. |
| `npx convex dev` | Run and sync the Convex development backend. |

## Architecture

- `src/app/(marketing)` contains the landing page and marketing components.
- `src/app/(main)` contains authenticated workspace routes, navigation, document lists, and document pages.
- `src/app/(public)/preview/[documentId]` renders published documents without editing controls.
- `src/components` contains the BlockNote editor, document toolbar, cover controls, upload UI, and shared providers.
- `src/app/api/edgestore/[...edgestore]` exposes the EdgeStore App Router handler.
- `convex/schema.ts` defines the document table; `convex/documents.ts` contains document queries and mutations.
- `public/` contains images and favicons used by the app.

Each document stores its title, owner, optional parent, serialized editor content, icon, optional cover URL, archive state, and publication state. Image files live in EdgeStore; Convex stores their URLs.

## Publishing and Storage Notes

Published, unarchived documents can be read through `/preview/[documentId]`. Other document reads and mutations require an authenticated owner.

The current EdgeStore `publicFiles` bucket is public and does not validate uploads. Uploaded files can be accessed by URL. Add appropriate file validation and access controls before using this configuration for sensitive or production uploads.

Never commit `.env.local`, EdgeStore credentials, Clerk secrets, or other tokens. If a credential is exposed, revoke and rotate it in the service dashboard.
