import { Express } from 'express';
import flash from 'connect-flash';
import path from 'path';
import { AppRouteValues } from '../constants/AppRouteValues';
import { AppViewValues } from '../constants/AppViewValues';
export default function landingRoute(app: Express) {
  app.use(flash());
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../views'));
  app.get(AppRouteValues.LANDING_PAGE, (req, res) => {
    res.render(AppViewValues.LANDING_PAGE); // Render 'landing.ejs' view
  });
}
