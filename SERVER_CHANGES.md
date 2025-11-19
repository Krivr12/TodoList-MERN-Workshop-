# Server.js Changes for Deployment

## Changes Made

### 1. Added ES Module Path Utilities

```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

**Why:** ES modules don't have `__dirname` available by default. We need to manually create it to construct absolute paths to the frontend build folder.

### 2. Updated CORS Configuration

```javascript
// Before:
app.use(cors({
    origin: "http://localhost:5173"
}));

// After:
app.use(cors());
```

**Why:** The original CORS only allowed requests from localhost:5173 (Vite dev server). In production, we need to allow requests from the Lightsail public IP address. Using `cors()` without options allows all origins.

### 3. Serve Static Frontend Files

```javascript
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
```

**Why:** This serves all the built React files (HTML, CSS, JS, images) from the `frontend/dist` folder. When you run `npm run build` in the frontend, it creates optimized production files in the `dist` folder. This middleware makes those files accessible.

### 4. Handle Client-Side Routing

```javascript
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});
```

**Why:** React Router handles routing on the client side. When a user visits `/create` or `/notes/123`, we need to return `index.html` so React can take over and render the correct component. This catch-all route must be placed AFTER the API routes (`/api/notes`) so API calls aren't intercepted.

## Complete Modified File

```javascript
import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
})

app.use("/api/notes", notesRoutes);

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

connectDB().then(() => {
    app.listen(PORT, () =>{
    console.log("Server started on PORT:", PORT);
    })
})
```

## How It Works

1. Express serves the API routes at `/api/notes`
2. Express serves static files from `frontend/dist` (CSS, JS, images)
3. Any other route returns `index.html`, letting React Router handle navigation
4. The frontend and backend run on the same port (5001), eliminating CORS issues
