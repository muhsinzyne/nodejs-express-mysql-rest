import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { AppDataSource } from './data-source'; // Adjust path based on your folder structure
import { QueueAdmin } from '../typeorm/models/QueueAdmin'; // Adjust path based on your folder structure
import * as crypto from 'crypto';

// Serialize and deserialize users to store session data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done) => {
  done(null, user.id); // We store the user ID in the session
});

passport.deserializeUser(async (id: number, done) => {
  const userRepository = AppDataSource.getRepository(QueueAdmin);
  const user = await userRepository.findOne({ where: { id } });
  done(null, user); // Deserialize the user to attach to `req.user`
});

// Local strategy for username and password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const userRepository = AppDataSource.getRepository(QueueAdmin);
    const user = await userRepository.findOne({ where: { username } });
    if (!user) return done(null, false, { message: 'Incorrect username.' });

    // const a = crypto.randomBytes(32).toString('hex');

    // console.log(a);
    // const saltRounds = 10;
    // bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    //   if (err) {
    //     console.error('Error hashing password:', err);
    //   } else {
    //     console.log('Hashed Password:', hashedPassword);
    //   }
    // });
    // Compare the password hash
    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Incorrect password.' });

    return done(null, user); // If credentials are correct, user is authenticated
  })
);

export default passport;
