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

export default function setupRoutes(app: Express) {
  app.use(flash());

  // queue admin dashboard route URL
  const adminQueue = '/admin/queue-dashboard';
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
    '/admin/queue-dashboard/login',
    passport.authenticate('local', {
      successRedirect: adminQueue,
      failureRedirect: '/admin/queue-dashboard/login',
      failureFlash: true, // Optional, can be used to send messages
    })
  );

  app.get('/admin/queue-dashboard/login', (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect(adminQueue);
    }
    // Pass the flash message (if any) to the login template
    const message = req.flash('error'); // You can name this flash message whatever you like
    res.render('admin/queue-dashboard/login', { message: message[0] }); // If no message, it will be undefined
  });

  app.get('/admin/queue-dashboard/logout', (req, res) => {
    req.logout((err: Error | null) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to log out');
      }
      res.redirect('/admin/queue-dashboard/login');
    });
  });

  QueueManager.initQueues();
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath(adminQueue);
  const bullQueues = Object.values(QueueManager.getQueues()).map(
    (queue) => new BullMQAdapter(queue)
  );
  createBullBoard({
    queues: bullQueues,
    serverAdapter: serverAdapter,
  });

  app.use(adminQueue, isAuthenticated, serverAdapter.getRouter()); // Access the UI at /admin/queues
}
