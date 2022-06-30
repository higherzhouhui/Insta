declare namespace GlobalTwitter {
  interface User {
    id?: number | string;
    name?: string;
    username?: string;
    description?: string;
    profile_image_url?: string;
    created_at?: string;
    public_metrics?: UserPublicMetrics;
  }
  interface UserPublicMetrics {
    followers_count?: number;
    following_count?: number;
    listed_count?: number;
    tweet_count?: number;
  }
}
