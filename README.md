# Local-First Explorer

A high-performance, offline-capable user directory application built with Next.js, Zustand, and Dexie.js (IndexedDB).
## SCREENSHOTS
### DESKTOP
<img width="1143" height="925" alt="image" src="https://github.com/user-attachments/assets/f4716875-54d2-4ccc-982a-7b4a9c2138ff" />

### MOBILE
<img width="604" height="953" alt="image" src="https://github.com/user-attachments/assets/baccf2e0-3833-4d7a-9e04-202d95a94f8a" />

### DARK MODE
<img width="1150" height="922" alt="image" src="https://github.com/user-attachments/assets/4ac63029-8ec2-461b-9941-6a5e0146b877" />

## How to install dependencies

To install the project dependencies, run one of the following:

```bash
npm install
# or
yarn install
# or
pnpm install
```

## How to run the project

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to simulate offline/failure scenarios

### Offline Mode
1. Open Chrome DevTools (Press `F12` or `Cmd+Option+I`).
2. Go to the **Network** tab.
3. Locate the "No throttling" dropdown (usually near the top).
4. Select **Offline**.
5. Navigate through the app or reload the page.
   - **Expected behavior**: The app should continue to display previously loaded users from IndexedDB. An "Offline Mode" indicator will appear in the header.

### API Failure
1. In the **Network** tab, create a Request Blocking pattern for `randomuser.me`.
2. Reload the page (while ensuring "Offline" is unchecked).
3. **Expected behavior**: The app will attempt to fetch, fail, and then fallback to displaying cached data from Dexie.js if available. If no cache exists, an error state is shown.

## Known issues or limitations

1. **Random Data Consistency**: Since the app uses `randomuser.me`, fetching "Page 1" twice might return completely different users if the cache is cleared or missing. The app prefers local cache to mitigate this, but fresh fetches will introduce new random data.
2. **Image Caching**: While user data is stored in IndexedDB, user images rely on the browser's standard disk cache. If the browser cache is cleared, images might not load while offline.
3. **Pagination Limit**: The current pagination implementation assumes a continuous stream of pages but doesn't implement a "Total Pages" limit since the API is infinite.

## What you would improve with more time

1. **Service Worker (PWA)**: Implement a Service Worker to cache JS/CSS bundles and image assets, making the app fully installable and functional even without any network headers.
2. **Virtualization**: Use `react-window` or `tanstack-virtual` for the user grid to maintain high performance if the user stores thousands of profiles locally.
3. **Sync Engine**: dedicated synchronization logic to handle conflicts or efficiently update stale data (e.g., "stale-while-revalidate" pattern for the DB data).
4. **Testing**: Add unit tests for the Zustand store actions and integration tests (Playwright) for the offline capabilities.
