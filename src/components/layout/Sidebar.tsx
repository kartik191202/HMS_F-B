"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSidebarNavigation } from "@/hooks/useSidebarNavigation";
import { ChevronsLeft, ChevronsRight, HeartPulse, Search, X } from "lucide-react";
import { SidebarNavItem, SidebarNavSection } from "@/lib/data/sidebarNav";

const sections = [
  {
    title: "Workspace",
    items: [
      ["Dashboard", "/dashboard"],
      ["OPD", "/opd"],
      ["IPD", "/ipd"],
    ],
  },
  {
    title: "Operations",
    items: [
      ["Billing", "/billing"],
      ["Patient Search", "/opd/patient-search"],
      ["Doctor Master", "/opd/masters/doctor"],
    ],
  },
];
export function Sidebar() {
  const pathname = usePathname();
  const navigation = useSidebarNavigation();

  return (
    <aside
      className="hms-sidebar"
      data-collapsed={navigation.collapsed}
      data-mounted={navigation.mounted}
    >
      <SidebarBrand collapsed={navigation.collapsed} />

      {!navigation.collapsed && (
        <SidebarSearch
          query={navigation.query}
          onChange={navigation.setQuery}
        />
      )}

      <SidebarNavigation
        pathname={pathname}
        collapsed={navigation.collapsed}
        sections={navigation.filteredSections}
        query={navigation.query}
      />

      <SidebarCollapseButton
        collapsed={navigation.collapsed}
        onClick={navigation.toggleCollapsed}
      />
    </aside>
  );
}

function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="hms-sidebar__brand">
      <span className="hms-sidebar__logo" aria-hidden="true">
        <HeartPulse size={18} />
      </span>
      {!collapsed && (
        <div className="hms-sidebar__brand-copy">
          <p className="hms-sidebar__brand-name">MediNext HMS</p>
          <p className="hms-sidebar__brand-meta">Enterprise workspace</p>
        </div>
      )}
    </div>
  );
}

function SidebarSearch({
  query,
  onChange,
}: {
  query: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="hms-sidebar__search">
      <label className="hms-sidebar__search-label" htmlFor="sidebar-search">
        Search Menu
      </label>
      <div className="hms-sidebar__search-control">
        <Search className="hms-sidebar__search-icon" size={14} aria-hidden="true" />
        <input
          id="sidebar-search"
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search modules, e.g. billing..."
          className="hms-sidebar__search-input"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="hms-sidebar__icon-button"
            aria-label="Clear menu search"
          >
            <X size={13} />
          </button>
        )}
      </div>
    </div>
  );
}

function SidebarNavigation({
  pathname,
  collapsed,
  sections,
  query,
}: {
  pathname: string;
  collapsed: boolean;
  sections: SidebarNavSection[];
  query: string;
}) {
  return (
    <nav className="hms-sidebar__navigation" aria-label="Main navigation">
      {sections.length === 0 ? (
        <p className="hms-sidebar__empty-state">
          No menu items match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        sections.map((section) => (
          <SidebarSection
            key={section.title}
            pathname={pathname}
            collapsed={collapsed}
            section={section}
          />
        ))
      )}
    </nav>
  );
}

function SidebarSection({
  pathname,
  collapsed,
  section,
}: {
  pathname: string;
  collapsed: boolean;
  section: SidebarNavSection;
}) {
  return (
    <section className="hms-sidebar__section">
      {!collapsed && <h2 className="hms-sidebar__section-title">{section.title}</h2>}
      <ul className="hms-sidebar__list">
        {section.items.map((item) => (
          <SidebarItem
            key={item.href}
            item={item}
            pathname={pathname}
            collapsed={collapsed}
          />
        ))}
      </ul>
    </section>
  );
}

function SidebarItem({
  item,
  pathname,
  collapsed,
}: {
  item: SidebarNavItem;
  pathname: string;
  collapsed: boolean;
}) {
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        title={collapsed ? item.label : undefined}
        aria-current={active ? "page" : undefined}
        className="hms-sidebar__item"
        data-active={active}
        data-collapsed={collapsed}
      >
        <Icon className="hms-sidebar__item-icon" size={16} aria-hidden="true" />
        {!collapsed && <span className="hms-sidebar__item-label">{item.label}</span>}
        {!collapsed && item.badge && <span className="hms-sidebar__item-badge">{item.badge}</span>}
      </Link>
    </li>
  );
}

function SidebarCollapseButton({
  collapsed,
  onClick,
}: {
  collapsed: boolean;
  onClick: () => void;
}) {
  return (
    <div className="hms-sidebar__footer">
      <button
        type="button"
        onClick={onClick}
        className="hms-sidebar__collapse-button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!collapsed}
      >
        {collapsed ? <ChevronsRight size={16} /> : <><ChevronsLeft size={16} /><span>Collapse</span></>}
      </button>
    </div>
  );
}
