import express from 'express';
import { createServer, getContext, getServerPort } from '@devvit/server';
import { getRedis } from '@devvit/redis';
import { getLeaderboard, addScore, getUserBestScore, shareScore } from './api/leaderboard';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());
// Middleware for URL-encoded body parsing
app.use(express.urlencoded({ extended: true }));
// Middleware for plain text body parsing
app.use(express.text());

const router = express.Router();

// Get leaderboard
router.get('/api/leaderboard', async (_req, res): Promise<void> => {
  try {
    const redis = getRedis();
    const scores = await getLeaderboard({ redis });
    
    res.json({
      status: 'success',
      scores: scores.map(entry => ({
        score: entry.score,
        timestamp: entry.timestamp,
        username: entry.username || 'Unknown Player'
      }))
    });
  } catch (error) {
    console.error('Leaderboard GET error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get leaderboard'
    });
  }
});

// Add score to leaderboard
router.post('/api/leaderboard', async (req, res): Promise<void> => {
  try {
    const { score } = req.body;
    const context = getContext();
    const { userId } = context;
    
    if (typeof score !== 'number' || score < 0) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid score'
      });
      return;
    }
    
    // Get username from Reddit API
    let username = 'Unknown Player';
    try {
      if (context.reddit) {
        const currentUser = await context.reddit.getCurrentUser();
        username = currentUser?.username || 'Unknown Player';
      }
    } catch (userError) {
      console.log('Could not get username:', userError);
      // Continue with default username
    }
    
    const redis = getRedis();
    await addScore({ redis, score, userId, username });
    
    res.json({
      status: 'success',
      message: 'Score added successfully'
    });
  } catch (error) {
    console.error('Leaderboard POST error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to add score'
    });
  }
});

// Share score - ONLY for current user's current score
router.post('/api/share-score', async (req, res): Promise<void> => {
  try {
    const { score, shareType } = req.body;
    const context = getContext();
    
    if (typeof score !== 'number' || score < 0) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid score'
      });
      return;
    }
    
    if (!['post', 'comment'].includes(shareType)) {
      res.status(400).json({
        status: 'error',
        message: 'Invalid share type. Must be "post" or "comment"'
      });
      return;
    }
    
    if (!context.reddit) {
      res.status(500).json({
        status: 'error',
        message: 'Reddit API not available'
      });
      return;
    }
    
    // Get username
    let username = 'Unknown Player';
    try {
      const currentUser = await context.reddit.getCurrentUser();
      username = currentUser?.username || 'Unknown Player';
    } catch (userError) {
      console.log('Could not get username for sharing:', userError);
    }
    
    // For comments, use the current post ID from context
    const postId = shareType === 'comment' ? context.postId : undefined;
    
    const result = await shareScore({
      reddit: context.reddit,
      score,
      username,
      shareType,
      postId
    });
    
    if (result.success) {
      res.json({
        status: 'success',
        message: result.message,
        url: result.url
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: result.message
      });
    }
  } catch (error) {
    console.error('Share score error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Oops! Failed to share your score. Please try again.'
    });
  }
});

// Get user's best score
router.get('/api/user/best-score', async (_req, res): Promise<void> => {
  try {
    const { userId } = getContext();
    
    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'User not authenticated'
      });
      return;
    }
    
    const redis = getRedis();
    const bestScore = await getUserBestScore({ redis, userId });
    
    res.json({
      status: 'success',
      bestScore
    });
  } catch (error) {
    console.error('User best score error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get user best score'
    });
  }
});

// Health check endpoint
router.get('/api/health', (_req, res): void => {
  res.json({
    status: 'success',
    message: 'Karma Katcher server is running!',
    timestamp: new Date().toISOString()
  });
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = getServerPort();

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port, () => console.log(`Karma Katcher server running on http://localhost:${port}`));