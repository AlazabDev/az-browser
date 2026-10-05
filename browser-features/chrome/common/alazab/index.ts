// SPDX-License-Identifier: MPL-2.0

import { noraComponent, NoraComponentBase } from "#features-chrome/utils/base";
import { onCleanup } from "solid-js";
import { setPanelSidebarData } from "../panel-sidebar/data/data.ts";
import Workspaces from "../workspaces/index.ts";
import { workspacesDataStore } from "../workspaces/data/data.ts";
import { ALAZAB_BRANDING, ALAZAB_WORKSPACE_PRESETS } from "./defaults";
import { ALAZAB_PLUGINS } from "./registry";

const WORKSPACES_SEEDED_PREF = "floorp.alazab.phase1.workspacesSeeded";
const WORKSPACE_RETRY_LIMIT = 40;
const WORKSPACE_RETRY_DELAY_MS = 250;

@noraComponent(import.meta.hot)
export default class AlazabBrowser extends NoraComponentBase {
  init(): void {
    this.validateConfiguration();
    this.seedSidebarPanels();
    this.seedWorkspacePresets();

    this.logger?.info(
      `Initializing ${ALAZAB_BRANDING.productName} configuration (${ALAZAB_PLUGINS.length} services)`,
    );
  }

  private validateConfiguration(): void {
    const pluginIds = new Set(ALAZAB_PLUGINS.map((plugin) => plugin.id));

    for (const workspace of ALAZAB_WORKSPACE_PRESETS) {
      for (const pluginId of workspace.pluginIds) {
        if (!pluginIds.has(pluginId)) {
          this.logger?.warn(
            `Alazab workspace ${workspace.id} references unknown plugin ${pluginId}`,
          );
        }
      }
    }
  }

  private seedSidebarPanels(): void {
    const sidebarPlugins = ALAZAB_PLUGINS.filter(
      (plugin) => plugin.enabledByDefault && plugin.surface.sidebar,
    );

    setPanelSidebarData((currentPanels) => {
      const existingIds = new Set(currentPanels.map((panel) => panel.id));
      const additions = sidebarPlugins
        .filter((plugin) => !existingIds.has(`alazab-${plugin.id}`))
        .map((plugin) => ({
          id: `alazab-${plugin.id}`,
          type: "web" as const,
          width: 420,
          url: plugin.url,
          icon: undefined,
          userContextId: 0,
          zoomLevel: 1,
          userAgent: false,
          extensionId: undefined,
        }));

      return additions.length > 0 ? [...currentPanels, ...additions] : currentPanels;
    });
  }

  private seedWorkspacePresets(): void {
    if (Services.prefs.getBoolPref(WORKSPACES_SEEDED_PREF, false)) {
      return;
    }

    let attempts = 0;
    let timer: number | undefined;

    const seed = () => {
      attempts += 1;
      const ctx = Workspaces.getCtx(window);

      if (!ctx) {
        if (attempts < WORKSPACE_RETRY_LIMIT) {
          timer = window.setTimeout(seed, WORKSPACE_RETRY_DELAY_MS);
        } else {
          this.logger?.warn("Workspaces did not initialize; Alazab presets were not seeded");
        }
        return;
      }

      const existingNames = new Set(
        Array.from(workspacesDataStore.data.values()).map((workspace) => workspace.name),
      );
      const originalWorkspaceId = ctx.getSelectedWorkspaceID();

      for (const preset of ALAZAB_WORKSPACE_PRESETS) {
        if (!existingNames.has(preset.name)) {
          ctx.createWorkspace(preset.name);
          existingNames.add(preset.name);
        }
      }

      if (ctx.isWorkspaceID(originalWorkspaceId)) {
        ctx.changeWorkspace(originalWorkspaceId);
      }

      Services.prefs.setBoolPref(WORKSPACES_SEEDED_PREF, true);
      this.logger?.info("Alazab workspace presets seeded");
    };

    timer = window.setTimeout(seed, 0);
    onCleanup(() => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    });
  }
}

export { ALAZAB_BRANDING, ALAZAB_WORKSPACE_PRESETS, ALAZAB_PLUGINS };
export type {
  AlazabBranding,
  AlazabPlugin,
  AlazabPluginCategory,
  AlazabPluginSecurity,
  AlazabPluginSurface,
  AlazabWorkspacePreset,
} from "./types";
