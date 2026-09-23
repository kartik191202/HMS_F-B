import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BedDouble,
  ClipboardPlus,
  FileBarChart,
  LayoutDashboard,
  Receipt,
  Settings2,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type SidebarNavSection = {
  title: string;
  items: SidebarNavItem[];
};

export const SIDEBAR_NAV: SidebarNavSection[] = [
  { title: "Workspace", items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }] },
  {
    title: "OPD Modules",
    items: [
      { label: "New OPD Registration", href: "/opd/registration", icon: ClipboardPlus },
      { label: "Patient Search", href: "/opd/patient-search", icon: Users },
      { label: "OPD Services", href: "/opd", icon: Stethoscope },
    ],
  },
  {
    title: "IPD Modules",
    items: [
      { label: "IPD Overview", href: "/ipd", icon: Activity },
      { label: "Bed Management", href: "/ipd/bed-management", icon: BedDouble },
      { label: "Admissions", href: "/ipd/admission", icon: ClipboardPlus },
      { label: "Discharge", href: "/ipd/discharge", icon: FileBarChart },
    ],
  },
  {
    title: "Billing & Masters",
    items: [
      { label: "Billing", href: "/billing", icon: Receipt },
      { label: "OPD Billing", href: "/billing/opd-billing", icon: Receipt },
      { label: "Doctor Master", href: "/masters/doctor", icon: Stethoscope },
      { label: "Department Master", href: "/masters/department", icon: Settings2 },
      { label: "City Master", href: "/masters/city", icon: ShieldCheck },
    ],
  },
];
