
export const getPlatformUrl = (platform: string, title: string) => {
  const query = encodeURIComponent(title);
  switch (platform.toLowerCase()) {
    case 'netflix':
      return `https://www.netflix.com/search?q=${query}`;
    case 'amazon':
    case 'prime':
    case 'amazon prime':
      return `https://www.amazon.com/s?k=${query}&i=instant-video`;
    case 'hulu':
      return `https://www.hulu.com/search?q=${query}`;
    case 'disney+':
    case 'disney plus':
      return `https://www.disneyplus.com/search?q=${query}`;
    case 'hbo':
    case 'hbo max':
      return `https://www.max.com/search?q=${query}`;
    case 'apple tv':
    case 'apple tv+':
      return `https://tv.apple.com/search?term=${query}`;
    default:
      return `https://www.google.com/search?q=watch+${query}+on+${platform}`;
  }
};

export const getExternalContentUrl = (item: {
  url?: string;
  type: string;
  title: string;
  platform?: string[];
  artist?: string;
}) => {
  if (item.url) {
    return item.url;
  }
  
  // Fallback URLs based on content type
  if (item.type === 'movie') {
    const platformUrl = item.platform && item.platform.length > 0 
      ? getPlatformUrl(item.platform[0], item.title)
      : `https://www.google.com/search?q=watch+${encodeURIComponent(item.title)}`;
    return platformUrl;
  } else {
    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(item.title + ' ' + (item.artist || ''))}`;
    return spotifyUrl;
  }
};
