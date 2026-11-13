"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {useBrand} from "@/lib/brand";

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
  const brand=useBrand();
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY+brand.slug);
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
        ? `${brand.name} — 你的全天候 AI 销售团队`
        : `${brand.name} — Your 24/7 AI Sales Team`;
  }, [lang,brand.name]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY+brand.slug, next);
    } catch {}
  }, []);

  const t = useCallback((copy: Copy) => copy[lang].replaceAll("{brand}",brand.name), [lang,brand.name]);

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
