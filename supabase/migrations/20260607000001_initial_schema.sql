-- AI News Claude — Initial Schema
-- Migration: 20260607000001_initial_schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Articles: AI news collected from various sources
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  summary_th TEXT,
  summary_en TEXT,
  category TEXT CHECK (category IN ('research', 'tools', 'business', 'regulation', 'general')),
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sources: News sources to monitor
CREATE TABLE IF NOT EXISTS sources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  feed_url TEXT,
  category TEXT,
  active BOOLEAN DEFAULT TRUE,
  last_fetched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved articles: User bookmarks
CREATE TABLE IF NOT EXISTS saved_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- Trends: Weekly/monthly trend analysis
CREATE TABLE IF NOT EXISTS trends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  topic TEXT NOT NULL,
  analysis_th TEXT NOT NULL,
  analysis_en TEXT,
  period TEXT NOT NULL,
  article_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Research notes: arxiv papers
CREATE TABLE IF NOT EXISTS research_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  paper_title TEXT NOT NULL,
  arxiv_id TEXT UNIQUE,
  authors TEXT[] DEFAULT '{}',
  summary_th TEXT NOT NULL,
  key_points TEXT[] DEFAULT '{}',
  url TEXT,
  published_at DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_saved_articles_user_id ON saved_articles(user_id);
CREATE INDEX IF NOT EXISTS idx_trends_period ON trends(period);

-- Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_notes ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY IF NOT EXISTS "articles_public_read" ON articles FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "sources_public_read" ON sources FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "trends_public_read" ON trends FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "research_notes_public_read" ON research_notes FOR SELECT USING (true);

-- Saved articles: users manage their own
CREATE POLICY IF NOT EXISTS "saved_articles_user_select" ON saved_articles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "saved_articles_user_insert" ON saved_articles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY IF NOT EXISTS "saved_articles_user_delete" ON saved_articles FOR DELETE USING (auth.uid() = user_id);

-- Seed initial sources
INSERT INTO sources (name, url, feed_url, category, active) VALUES
  ('TechCrunch AI', 'https://techcrunch.com/tag/artificial-intelligence/', 'https://techcrunch.com/tag/artificial-intelligence/feed/', 'general', true),
  ('VentureBeat AI', 'https://venturebeat.com/ai/', 'https://venturebeat.com/ai/feed/', 'business', true),
  ('The Decoder', 'https://the-decoder.com/', 'https://the-decoder.com/feed/', 'general', true),
  ('HuggingFace Papers', 'https://huggingface.co/papers', NULL, 'research', true),
  ('Anthropic News', 'https://anthropic.com/news', NULL, 'general', true),
  ('OpenAI Blog', 'https://openai.com/blog', NULL, 'general', true)
ON CONFLICT DO NOTHING;
