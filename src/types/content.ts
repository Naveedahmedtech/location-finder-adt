export interface LanguageContent {
  _id: string;
  created_at: string;
  cta: string;
  features: string[];
  headline: string;
  intro_paragraph: string;
  updated_at: string;
}

export interface Languages {
  [key: string]: LanguageContent;
}

export interface PageContent {
  languages?: Languages | Record<string, AboutLanguageContent>;
  [key: string]: unknown;
}

export interface ContentContextType {
  currentLanguage: string;
  content: LanguageContent | null;
  languages: Languages;
  setLanguage: (lang: string) => void;
  pageContent: Record<string, PageContent>;
  getPageContent: (page: string) => PageContent | null;
  refetchContent: () => void;
}

export interface AboutLanguageContent {
  _id: string;
  created_at: string;
  paragraphs: string[];
  title: string;
  updated_at: string;
}

export interface AboutData {
  languages: {
    [key: string]: AboutLanguageContent;
  };
} 
