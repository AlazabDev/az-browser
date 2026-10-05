// SPDX-License-Identifier: MPL-2.0

export type AlazabPluginCategory =
  | "ai"
  | "operations"
  | "finance"
  | "communication"
  | "development";

export interface AlazabPluginSurface {
  sidebar: boolean;
  workspace: boolean;
  webPanel: boolean;
  pwa: boolean;
}

export interface AlazabPluginSecurity {
  requiresAuth: boolean;
  allowPageContext: boolean;
}

export interface AlazabPlugin {
  id: string;
  name: string;
  category: AlazabPluginCategory;
  url: string;
  enabledByDefault: boolean;
  surface: AlazabPluginSurface;
  security: AlazabPluginSecurity;
}

export interface AlazabBranding {
  productName: string;
  locale: "ar-EG";
  fallbackLocale: "en-US";
  direction: "rtl";
  primaryColor: `#${string}`;
  accentColor: `#${string}`;
}

export interface AlazabWorkspacePreset {
  id: string;
  name: string;
  pluginIds: readonly string[];
}
