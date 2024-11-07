import { Express } from 'express';
import flash from 'connect-flash';
import path from 'path';
export default function landingRoute(app: Express) {
  app.use(flash());
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../views'));
  app.get('/', (req, res) => {
    res.render('landing/landing-01'); // Render 'landing.ejs' view
  });
}
