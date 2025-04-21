-- Insert sample movies
INSERT INTO content (title, description, type, url, image_url) VALUES
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'movie', 'https://www.imdb.com/title/tt1375666/', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'),
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'movie', 'https://www.imdb.com/title/tt0468569/', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg'),
('Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 'movie', 'https://www.imdb.com/title/tt0816692/', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'),
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'movie', 'https://www.imdb.com/title/tt0111161/', 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg'),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'movie', 'https://www.imdb.com/title/tt0110912/', 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg');

-- Insert sample songs
INSERT INTO content (title, description, type, url, image_url) VALUES
('Bohemian Rhapsody', 'Classic rock song by Queen', 'song', 'https://open.spotify.com/track/7tFiyTwD0nx5a1eklYtX2J', 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b'),
('Stairway to Heaven', 'Legendary rock song by Led Zeppelin', 'song', 'https://open.spotify.com/track/5CQ30WqJwcep0pWcW5OK2P', 'https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69'),
('Hotel California', 'Classic rock song by Eagles', 'song', 'https://open.spotify.com/track/40riOy7xaLWqhDtpqZ0Wor', 'https://i.scdn.co/image/ab67616d0000b273e52f9a4b3c45f6f7a0a0b0b0'),
('Sweet Child O'' Mine', 'Rock song by Guns N'' Roses', 'song', 'https://open.spotify.com/track/7sn0zZQpQp0e1qG5f8U5qY', 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b'),
('Smells Like Teen Spirit', 'Grunge rock song by Nirvana', 'song', 'https://open.spotify.com/track/5BCCn5DKjuh72MOUVrxk22', 'https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b');

-- Create a test user profile (if not exists)
INSERT INTO profiles (id, username, email, phone, avatar_url)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  'testuser',
  'test@example.com',
  '+1234567890',
  'https://example.com/avatar.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '00000000-0000-0000-0000-000000000000'
);

-- Create a test playlist for the test user
INSERT INTO playlists (id, user_id, name, description)
SELECT 
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'My Favorite Movies',
  'A collection of my favorite movies'
WHERE NOT EXISTS (
  SELECT 1 FROM playlists WHERE id = '11111111-1111-1111-1111-111111111111'
);

-- Add some content to the test playlist
INSERT INTO playlist_items (playlist_id, content_id, position)
SELECT 
  '11111111-1111-1111-1111-111111111111',
  id,
  ROW_NUMBER() OVER (ORDER BY created_at)
FROM content
WHERE type = 'movie'
LIMIT 3;

-- Create another test playlist
INSERT INTO playlists (id, user_id, name, description)
SELECT 
  '22222222-2222-2222-2222-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'My Favorite Songs',
  'A collection of my favorite songs'
WHERE NOT EXISTS (
  SELECT 1 FROM playlists WHERE id = '22222222-2222-2222-2222-222222222222'
);

-- Add some songs to the second playlist
INSERT INTO playlist_items (playlist_id, content_id, position)
SELECT 
  '22222222-2222-2222-2222-222222222222',
  id,
  ROW_NUMBER() OVER (ORDER BY created_at)
FROM content
WHERE type = 'song'
LIMIT 3; 