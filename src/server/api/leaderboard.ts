import { Context } from '@devvit/public-api';
import { RedisClient } from '@devvit/redis';

interface LeaderboardEntry {
  score: number;
  timestamp: number;
  userId?: string;
  username?: string;
}

const LEADERBOARD_KEY = 'karma_katcher_leaderboard';
const MAX_ENTRIES = 100;

export const getLeaderboard = async ({
  redis,
}: {
  redis: Context['redis'] | RedisClient;
}): Promise<LeaderboardEntry[]> => {
  try {
    const data = await redis.get(LEADERBOARD_KEY);
    if (!data) return [];
    
    const entries: LeaderboardEntry[] = JSON.parse(data);
    return entries
      .sort((a, b) => b.score - a.score)
      .slice(0, 50); // Return top 50
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
};

export const addScore = async ({
  redis,
  score,
  userId,
  username,
}: {
  redis: Context['redis'] | RedisClient;
  score: number;
  userId?: string;
  username?: string;
}): Promise<void> => {
  try {
    const currentData = await redis.get(LEADERBOARD_KEY);
    let entries: LeaderboardEntry[] = currentData ? JSON.parse(currentData) : [];
    
    const newEntry: LeaderboardEntry = {
      score,
      timestamp: Date.now(),
      userId,
      username,
    };
    
    entries.push(newEntry);
    
    // Keep only top scores and limit total entries
    entries = entries
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_ENTRIES);
    
    await redis.set(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error adding score to leaderboard:', error);
    throw error;
  }
};

export const getUserBestScore = async ({
  redis,
  userId,
}: {
  redis: Context['redis'] | RedisClient;
  userId: string;
}): Promise<number> => {
  try {
    const entries = await getLeaderboard({ redis });
    const userEntries = entries.filter(entry => entry.userId === userId);
    
    if (userEntries.length === 0) return 0;
    
    return Math.max(...userEntries.map(entry => entry.score));
  } catch (error) {
    console.error('Error getting user best score:', error);
    return 0;
  }
};

export const generateShareCaption = (score: number, username: string): string => {
  const captions = [
    `The cat distribution system blessed me with ${score} cats in Karma Katcher! 🐱 Who says you can't catch luck?`,
    `Just caught ${score} virtual cats! The cat distribution system works in mysterious ways... 🌳🐾`,
    `Karma Katcher update: ${score} cats successfully redistributed to loving homes (mine)! 😸`,
    `Breaking: Local human catches ${score} cats from tree. Cat distribution system efficiency at all-time high! 🎯`,
    `${score} cats caught and counting! The universe really said "here, have some cats" today 🐈‍⬛`,
    `Tree shaking level: Expert. Cats caught: ${score}. The cat distribution system chose me! 🌲`,
    `Plot twist: I went to play a game and the cat distribution system gave me ${score} cats instead! 🎮`,
    `${score} cats later and I'm starting to think this "random" cat distribution system isn't so random... 🤔`,
    `Successfully intercepted ${score} cats from the cat distribution system! My net game is strong 🥅`,
    `The cat distribution system said "catch these" and I said "bet" - ${score} cats secured! ✨`
  ];
  
  const randomCaption = captions[Math.floor(Math.random() * captions.length)];
  return `${randomCaption}\n\n🎮 Play Karma Katcher and test your luck with the cat distribution system!`;
};

export const shareScore = async ({
  reddit,
  score,
  username,
  shareType,
  postId,
}: {
  reddit: Context['reddit'];
  score: number;
  username: string;
  shareType: 'post' | 'comment';
  postId?: string;
}): Promise<{ success: boolean; message: string; url?: string }> => {
  try {
    const caption = generateShareCaption(score, username);
    
    if (shareType === 'post') {
      const subreddit = await reddit.getCurrentSubreddit();
      const post = await reddit.submitPost({
        title: `🐱 Caught ${score} cats in Karma Katcher! The cat distribution system is real!`,
        text: caption,
        subredditName: subreddit.name,
      }, { runAs: 'USER' });
      
      return {
        success: true,
        message: 'Score shared as post successfully!',
        url: post.url
      };
    } else if (shareType === 'comment' && postId) {
      const comment = await reddit.submitComment({
        id: postId,
        text: caption,
      }, { runAs: 'USER' });
      
      return {
        success: true,
        message: 'Score shared as comment successfully!',
        url: comment.url
      };
    } else {
      throw new Error('Invalid share type or missing post ID for comment');
    }
  } catch (error) {
    console.error('Error sharing score:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to share score'
    };
  }
};