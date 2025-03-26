'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {
  Languages,
  ContentContextType,
  PageContent,
} from '@/types/content';
import { API_CONFIG, API_ENDPOINTS } from '@/config/constants';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [languages, setLanguages] = useState<Languages>({});
  const [pageContent, setPageContent] = useState<Record<string, PageContent>>({
    home: {},
    about: {},
    privacy: {}, // ✅ NEW
  });

  const content = languages[currentLanguage] || null;

  const refetchContent = async () => {
    try {
      // ✅ HOME
      const homeRes = await fetch(`${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.HOME_CONTENT}`);
      const homeData = await homeRes.json();
      setLanguages(homeData.languages);
      setPageContent((prev) => ({ ...prev, home: homeData }));

      // ✅ ABOUT
      const aboutRes = await fetch(`${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.ABOUT_CONTENT}`);
      const aboutData = await aboutRes.json();
      setPageContent((prev) => ({ ...prev, about: aboutData }));

      // ✅ PRIVACY POLICY
      const privacyRes = await fetch(`${API_CONFIG.SERVER_URL}/${API_ENDPOINTS.PRIVACY_POLICY}`);
      const privacyData = await privacyRes.json();
      setPageContent((prev) => ({ ...prev, privacy: privacyData }));

    } catch (error) {
      console.error('Error refetching content:', error);
    }
  };

  useEffect(() => {
    refetchContent();
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && languages[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, [languages]);

  const setLanguage = (lang: string) => {
    if (languages[lang]) {
      setCurrentLanguage(lang);
      localStorage.setItem('preferred-language', lang);
    }
  };

  const getPageContent = (page: string) => {
    return pageContent[page] || null;
  };

  return (
      <ContentContext.Provider
          value={{
            currentLanguage,
            content,
            languages,
            setLanguage,
            pageContent,
            getPageContent,
            refetchContent,
          }}
      >
        {children}
      </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
