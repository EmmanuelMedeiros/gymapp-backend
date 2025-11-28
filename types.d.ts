const User = require('./src/context/user/entity/user.entity')

declare namespace Express {
  export interface Request {
      user: User;
  }
}