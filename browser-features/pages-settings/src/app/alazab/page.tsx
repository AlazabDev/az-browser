import { ALAZAB_BRANDING, ALAZAB_WORKSPACE_PRESETS } from "../../../../chrome/common/alazab/defaults.ts";
import { ALAZAB_PLUGINS } from "../../../../chrome/common/alazab/registry.ts";

export default function AlazabSettingsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6" dir={ALAZAB_BRANDING.direction}>
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: ALAZAB_BRANDING.accentColor }}>
              ALAZAB
            </p>
            <h1 className="text-2xl font-bold" style={{ color: ALAZAB_BRANDING.primaryColor }}>
              {ALAZAB_BRANDING.productName}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              إعدادات طبقة العزب والخدمات ومساحات العمل الافتراضية.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">{ALAZAB_BRANDING.locale}</div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">الخدمات</div>
            <div className="mt-1 text-2xl font-bold">{ALAZAB_PLUGINS.length}</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">المفعلة افتراضيًا</div>
            <div className="mt-1 text-2xl font-bold">
              {ALAZAB_PLUGINS.filter((plugin) => plugin.enabledByDefault).length}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">مساحات العمل</div>
            <div className="mt-1 text-2xl font-bold">{ALAZAB_WORKSPACE_PRESETS.length}</div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">الخدمات</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {ALAZAB_PLUGINS.map((plugin) => (
            <div key={plugin.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
              <div>
                <div className="font-medium">{plugin.name}</div>
                <div className="mt-1 truncate text-xs text-muted-foreground">{plugin.url}</div>
              </div>
              <span className="rounded-full border px-2 py-1 text-xs">
                {plugin.enabledByDefault ? "مفعلة" : "اختيارية"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">مساحات العمل الافتراضية</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {ALAZAB_WORKSPACE_PRESETS.map((workspace) => (
            <div key={workspace.id} className="rounded-lg border p-4">
              <div className="font-medium">{workspace.name}</div>
              <div className="mt-2 text-xs text-muted-foreground">
                {workspace.pluginIds.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
