import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use('/img', express.static(join(__dirname, 'img')));

//Rutas
import isAuthenticated from './middleware/isAuthenticated.js';
import menu from './routes/menu.routes.js';
import auth from './routes/auth.routes.js';

app.use('/auth', auth);
app.use(isAuthenticated);
app.use('/menu', menu);

app.listen(PORT, () => console.log('Listen in PORT 3000'));
