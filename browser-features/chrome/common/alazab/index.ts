// SPDX-License-Identifier: MPL-2.0

import { noraComponent, NoraComponentBase } from "#features-chrome/utils/base";
import { ALAZAB_BRANDING, ALAZAB_WORKSPACE_PRESETS } from "./defaults";
import { ALAZAB_PLUGINS } from "./registry";

@noraComponent(import.meta.hot)
export default class AlazabBrowser extends NoraComponentBase {
  init(): void {
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

    this.logger?.info(
      `Initializing ${ALAZAB_BRANDING.productName} configuration (${ALAZAB_PLUGINS.length} services)`,
    );
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
