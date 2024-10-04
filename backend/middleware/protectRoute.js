//middleware/protectRoute.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Agent from '../models/agent.model.js';
import { generateToken, setCookie } from '../utils/generateToken.js';

export const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        decoded = jwt.decode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const tokenExpiry = decoded.exp;

        if (tokenExpiry - currentTime < 60 * 60 * 24) { // Refresh token if it's expiring soon
          let userOrAgent;
          if (decoded.userId) {
            userOrAgent = await User.findById(decoded.userId);
            if (!userOrAgent) {
              return res.status(404).json({ error: 'User Not Found' });
            }
          } else if (decoded.agentId) {
            userOrAgent = await Agent.findById(decoded.agentId);
            if (!userOrAgent) {
              return res.status(404).json({ error: 'Agent Not Found' });
            }
          }

          if (userOrAgent) {
            const newToken = generateToken(decoded.userId || decoded.agentId);
            setCookie(res, newToken);
          }
        }
      } else {
        return res.status(401).json({ error: "Unauthorized - Invalid Token!" });
      }
    }

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token!" });
    }

    if (decoded.userId) {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ error: 'User Not Found' });
      }
      req.user = user;
    } else if (decoded.agentId) {
      const agent = await Agent.findById(decoded.agentId);
      if (!agent) {
        return res.status(404).json({ error: 'Agent Not Found' });
      }
      req.agent = agent;
    } else {
      return res.status(401).json({ error: "Unauthorized - Invalid Token!" });
    }

    return next();

  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};