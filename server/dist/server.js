import express from 'express';
// import path from 'node:path';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/connection.js';
import routes from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3001;
// Fix path resolution for serving static assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serves static files in the entire client's dist folder
app.use(express.static(path.resolve(__dirname, '../../client/dist')));
app.use(routes);
db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
