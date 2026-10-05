// SPDX-License-Identifier: MPL-2.0

import type { AlazabBranding, AlazabWorkspacePreset } from "./types";

export const ALAZAB_BRANDING: AlazabBranding = {
  productName: "Alazab Browser",
  locale: "ar-EG",
  fallbackLocale: "en-US",
  direction: "rtl",
  primaryColor: "#030957",
  accentColor: "#FFB900",
};

export const ALAZAB_WORKSPACE_PRESETS: readonly AlazabWorkspacePreset[] = [
  {
    id: "alazab",
    name: "Alazab",
    pluginIds: ["chatgpt", "uberfix", "bim", "erpnext", "daftra", "whatsapp"],
  },
  {
    id: "operations",
    name: "Operations",
    pluginIds: ["uberfix", "bim", "erpnext", "whatsapp"],
  },
  {
    id: "development",
    name: "Development",
    pluginIds: ["chatgpt", "github", "supabase", "azure", "vercel", "mcp"],
  },
] as const;
