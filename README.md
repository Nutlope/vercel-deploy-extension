# Vercel Deploy Extension

This is a Chrome Extension that provides a 1 button click to deploy any github repo that you are visiting.

## Usage

1. Download in the [chrome extension store](https://chrome.google.com/webstore/detail/vercel-deploy/nkignhibadhmcbiiilleogljodcaonjk)
2. Pin the extension in your chrome menu bar for easy access
3. Click the extension when you're on any github web repo to deploy it to your Vercel account

## Features
- One click deploy to Vercel for any web-based GitHub repos
- Detects env variables if there's a `.env.example` file present and adds them to the Vercel deploy
- Works for subrepos as well such as apps in the [Next.js examples repo](https://github.com/vercel/next.js/tree/canary/examples)
