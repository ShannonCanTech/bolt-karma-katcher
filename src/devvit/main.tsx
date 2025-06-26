import { Devvit, Post } from '@devvit/public-api';

// Side effect import to bundle the server. The /index is required for server splitting.
import '../server/index';
import { defineConfig } from '@devvit/server';

defineConfig({
  name: '[Bolt] Karma Katcher',
  entry: 'index.html',
  height: 'tall',
  menu: { enable: false },
});

export const Preview: Devvit.BlockComponent<{ text?: string }> = ({ text = 'Loading Karma Katcher...' }) => {
  return (
    <zstack width={'100%'} height={'100%'} alignment="center middle">
      <vstack width={'100%'} height={'100%'} alignment="center middle">
        {/* Replace external loading.gif with native Devvit spinner */}
        <vstack alignment="center middle" padding="large">
          <text size="xlarge">🐱</text>
          <spacer size="small" />
          <text size="large">🔄</text>
        </vstack>
        <spacer size="small" />
        <text maxWidth={`80%`} size="large" weight="bold" alignment="center middle" wrap>
          {text}
        </text>
        <spacer size="small" />
        <text maxWidth={`80%`} size="medium" alignment="center middle" wrap color="#666">
          🐱 Catch falling meme cats with your net! 🥅
        </text>
        <spacer size="small" />
        <text maxWidth={`80%`} size="small" alignment="center middle" wrap color="#999">
          Click tree to shake • Use arrow keys to move net
        </text>
      </vstack>
    </zstack>
  );
};

// Menu item to create new game posts
Devvit.addMenuItem({
  label: '[Karma Katcher]: New Game Post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    let post: Post | undefined;
    try {
      const subreddit = await reddit.getCurrentSubreddit();
      post = await reddit.submitPost({
        title: '🐱 Karma Katcher - Catch the Falling Meme Cats! 🥅',
        subredditName: subreddit.name,
        preview: <Preview />,
      });
      
      ui.showToast({ text: 'Karma Katcher game post created! 🎮' });
      ui.navigateTo(post.url);
    } catch (error) {
      if (post) {
        await post.remove(false);
      }
      if (error instanceof Error) {
        ui.showToast({ text: `Error creating game post: ${error.message}` });
      } else {
        ui.showToast({ text: 'Error creating game post!' });
      }
    }
  },
});

export default Devvit;