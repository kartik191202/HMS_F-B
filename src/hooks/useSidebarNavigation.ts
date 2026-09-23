import { useEffect, useMemo, useState } from "react";
import { SIDEBAR_NAV } from "@/lib/data/sidebarNav";

const COLLAPSE_STORAGE_KEY = "hms.sidebar.collapsed";

export function useSidebarNavigation() {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === "1") setCollapsed(true);
    setMounted(true);
  }, []);

  const filteredSections = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return SIDEBAR_NAV;

    return SIDEBAR_NAV.map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(search),
      ),
    })).filter((section) => section.items.length > 0);
  }, [query]);

  function toggleCollapsed() {
    setCollapsed((previous) => {
      const next = !previous;
      window.localStorage.setItem(COLLAPSE_STORAGE_KEY, next ? "1" : "0");
      return next;
    });
    setQuery("");
  }

  return {
    collapsed,
    mounted,
    query,
    filteredSections,
    setQuery,
    toggleCollapsed,
  };
}
