"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "zh";
export type Copy = { en: string; zh: string };

// Kept from the static site so returning visitors keep their language.
const STORAGE_KEY = "asap-language";

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (copy: Copy) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const browserZh = navigator.language?.toLowerCase().startsWith("zh");
    const initial: Lang =
      saved === "zh" || saved === "en" ? saved : browserZh ? "zh" : "en";
    // Reading storage has to wait for the client; the static HTML is English.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    document.title =
      lang === "zh"
        ? "Wave Mind — 你的全天候 AI 销售团队"
        : "Wave Mind — Your 24/7 AI Sales Team";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  const t = useCallback((copy: Copy) => copy[lang], [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
