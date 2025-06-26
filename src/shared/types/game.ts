type Response<T> = { status: 'error'; message: string } | ({ status: 'success' } & T);

export type LetterState = 'initial' | 'correct' | 'present' | 'absent';

export type CheckResponse = Response<{
  exists?: boolean;
  solved: boolean;
  correct: [LetterState, LetterState, LetterState, LetterState, LetterState];
}>;

export type InitResponse = Response<{
  postId: string;
}>;

// Karma Katcher specific types
export interface LeaderboardEntry {
  score: number;
  timestamp: number;
  userId?: string;
  username?: string;
}

export type LeaderboardResponse = Response<{
  scores: LeaderboardEntry[];
}>;

export type ScoreSubmissionResponse = Response<{
  message: string;
}>;

export type UserBestScoreResponse = Response<{
  bestScore: number;
}>;

export type ShareScoreResponse = Response<{
  message: string;
  url?: string;
}>;

export interface ShareScoreRequest {
  score: number;
  shareType: 'post' | 'comment';
  postId?: string;
}