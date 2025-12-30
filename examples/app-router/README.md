# Rotion Next.js App Router Example

This example demonstrates how to use [Rotion](https://github.com/linyows/rotion) with Next.js App Router for static site generation.

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
   cd examples/app-router
   npm uninstall rotion
   npm install ../../rotion-*.tgz
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

This workflow allows you to verify changes to the Rotion package in a real Next.js application before publishing.
