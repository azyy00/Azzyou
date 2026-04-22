export interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  synopsis: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  episodes: number | null;
  status: string;
  season: string | null;
  year: number | null;
  genres: { name: string }[];
  studios: { name: string }[];
  trailer: {
    url: string | null;
  };
  url: string;
  type: string;
  source: string;
  duration: string;
  rating: string;
}

export interface Genre {
  mal_id: number;
  name: string;
  count: number;
}
