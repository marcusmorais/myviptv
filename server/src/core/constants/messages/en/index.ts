export const USER_MESSAGES = {
  NOT_FOUND: 'User not found',
  INVALID_CREDENTIALS: 'Invalid credentials',
  EMAIL_ALREADY_EXISTS: 'Email already in use',
  // ... outras mensagens
} as const;

export const PLAYLIST_MESSAGES = {
  NOT_FOUND: 'Playlist not found',
  NOT_FOUND_BY_USER: 'No playlists found for the user',
  INVALID_UUID: 'Invalid UUID format',
  INVALID_USER_ID: 'Invalid user ID format',
  INVALID_PLAYLIST_ID: 'Invalid playlist ID format',  
  DELETED: 'Playlist deleted successfully',
  // ... others mensagens
} as const;
