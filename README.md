# Vercel Deploy Extension

This is a Chrome Extension that provides a 1 click deploy to Vercel on any GitHub repo.

## Usage

1. Download the [chrome extension](https://chrome.google.com/webstore/detail/vercel-deploy/nkignhibadhmcbiiilleogljodcaonjk)
2. Click the extension when you're on any github web repo to deploy it to your Vercel account

## Features

- One click deploy to Vercel for any web-based GitHub repos
- Works for subrepos such as apps in the [Next.js examples repo](https://github.com/vercel/next.js/tree/canary/examples)
- Detects env variables if there's a `.env.example` file present and adds them to the Vercel deploy

## Need to test

- Troubleshoot env vars working, re-check this by running the code locally then debugging.
