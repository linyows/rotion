# Rotion Next.js Server Example

This example demonstrates how to use [Rotion](https://github.com/linyows/rotion) with the Next.js App Router on a Node.js server, instead of a static export. Pages are rendered on request and regenerated at most once a minute, so edits in Notion appear without a rebuild.

See [Server rendering](https://rotion.linyo.ws/server-rendering) for the details.

## How it differs from nextjs-approuter

- `next.config.ts` has no `output: 'export'`.
- `app/page.tsx` and `app/[id]/page.tsx` export `revalidate = 60`, and `app/[id]/page.tsx` has no `generateStaticParams`, so each page is rendered on its first request.
- `.env` sets `ROTION_DOCROOT=storage`, because `next start` serves only the files that were in `public/` when it started. `app/images/[name]/route.ts` and `app/files/[name]/route.ts` serve the downloaded files from `storage/`.
- `.env` also sets `ROTION_INCREMENTAL_CACHE=true`, so the running server fetches pages again when their `last_edited_time` changes.

## Run

Put your credentials in `.env.local`, then build and start the server:

```bash
cat > .env.local <<'ENV'
NOTION_TOKEN=ntn_xxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=668d797c76fa49349b05ad288df2d136
ENV
npm install
npm run build
npm start
```

The server keeps `.cache/` and `storage/` on disk, so run it where the working directory is writable and survives restarts.

## Remove what is no longer used

`npm run prune` runs `rotion prune --unused-for 7d`, which removes cache files and downloads that Rotion has not used for a week. Run it from a scheduled job, not right after `npm run build`: this example renders its pages on request, so a build only touches what it prerenders and everything else would look unused.

## Development

### Testing Local Changes

To test local changes to the Rotion package before publishing:

1. Build the Rotion package from the root directory:
   ```bash
   cd ../../
   npm run build
   ```

2. Create a tarball of the package:
   ```bash
   npm pack
   ```

3. Install the tarball in this example:
   ```bash
   cd examples/nextjs-server
   npm uninstall rotion
   npm install ../../rotion-*.tgz
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
