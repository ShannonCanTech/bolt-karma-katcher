import { Context } from '@devvit/public-api';
import { RedisClient } from '@devvit/redis';

interface LeaderboardEntry {
  score: number;
  timestamp: number;
  userId?: string;
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
}: {
  redis: Context['redis'] | RedisClient;
  score: number;
  userId?: string;
}): Promise<void> => {
  try {
    const currentData = await redis.get(LEADERBOARD_KEY);
    let entries: LeaderboardEntry[] = currentData ? JSON.parse(currentData) : [];
    
    const newEntry: LeaderboardEntry = {
      score,
      timestamp: Date.now(),
      userId,
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