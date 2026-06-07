export type ArticleCategory = 'research' | 'tools' | 'business' | 'regulation' | 'general'

export interface Article {
  id: string
  title: string
  url: string
  source: string
  published_at: string
  summary_th: string | null
  summary_en: string | null
  category: ArticleCategory | null
  tags: string[]
  image_url: string | null
  view_count: number
  created_at: string
}

export interface Source {
  id: string
  name: string
  url: string
  feed_url: string | null
  category: string | null
  active: boolean
  last_fetched_at: string | null
  created_at: string
}

export interface SavedArticle {
  id: string
  user_id: string
  article_id: string
  note: string | null
  created_at: string
  article?: Article
}

export interface Trend {
  id: string
  topic: string
  analysis_th: string
  analysis_en: string | null
  period: string
  article_ids: string[]
  created_at: string
}

export interface ResearchNote {
  id: string
  paper_title: string
  arxiv_id: string | null
  authors: string[]
  summary_th: string
  key_points: string[]
  url: string | null
  published_at: string | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      articles: { Row: Article; Insert: Omit<Article, 'id' | 'created_at' | 'view_count'>; Update: Partial<Article> }
      sources: { Row: Source; Insert: Omit<Source, 'id' | 'created_at'>; Update: Partial<Source> }
      saved_articles: { Row: SavedArticle; Insert: Omit<SavedArticle, 'id' | 'created_at'>; Update: Partial<SavedArticle> }
      trends: { Row: Trend; Insert: Omit<Trend, 'id' | 'created_at'>; Update: Partial<Trend> }
      research_notes: { Row: ResearchNote; Insert: Omit<ResearchNote, 'id' | 'created_at'>; Update: Partial<ResearchNote> }
    }
  }
}
