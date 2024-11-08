import { Express } from 'express';
import session from 'express-session';
import { isAuthenticated } from '../middlewares/authMiddleware';
import passport from '../config/passport-config'; // Adjust the import path based on your folder structure
import config from './../config/config';
import QueueManager from '../message-broker/QueueManager';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import flash from 'connect-flash';
import { AppRouteValues } from '../constants/AppRouteValues';
import { AppViewValues } from '../constants/AppViewValues';

export default function setupRoutes(app: Express) {
  app.use(flash());

  // queue admin dashboard route URL
  app.use(
    session({
      secret: config.appKey, // Change to a secret key
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.post(
    AppRouteValues.QUEUE_DASH_LOGIN,
    passport.authenticate('local', {
      successRedirect: AppRouteValues.QUEUE_DASH_BASE,
      failureRedirect: AppRouteValues.QUEUE_DASH_LOGIN,
      failureFlash: true, // Optional, can be used to send messages
    })
  );

  app.get(AppRouteValues.QUEUE_DASH_LOGIN, (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect(AppRouteValues.QUEUE_DASH_BASE);
    }
    // Pass the flash message (if any) to the login template
    const message = req.flash('error'); // You can name this flash message whatever you like
    res.render(AppViewValues.QUEUE_DASH_LOGIN_PAGE, { message: message[0] }); // If no message, it will be undefined
  });

  app.get(AppRouteValues.QUEUE_DASH_LOGOUT, (req, res) => {
    req.logout((err: Error | null) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to log out');
      }
      res.redirect(AppRouteValues.QUEUE_DASH_LOGIN);
    });
  });

  QueueManager.initQueues();
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath(AppRouteValues.QUEUE_DASH_BASE);
  const bullQueues = Object.values(QueueManager.getQueues()).map(
    (queue) => new BullMQAdapter(queue)
  );
  createBullBoard({
    queues: bullQueues,
    serverAdapter: serverAdapter,
  });

  app.use(
    AppRouteValues.QUEUE_DASH_BASE,
    isAuthenticated,
    serverAdapter.getRouter()
  ); // Access the UI at /admin/queues
}
