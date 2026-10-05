import { ALAZAB_BRANDING } from "../../../chrome/common/alazab/defaults.ts";
import { ALAZAB_PLUGINS } from "../../../chrome/common/alazab/registry.ts";

const categoryLabels: Record<string, string> = {
  ai: "الذكاء الاصطناعي",
  operations: "التشغيل",
  finance: "المالية",
  communication: "الاتصالات",
  development: "التطوير",
};

export function AlazabDashboard() {
  const plugins = ALAZAB_PLUGINS.filter((plugin) => plugin.enabledByDefault);
  const categories = Array.from(new Set(plugins.map((plugin) => plugin.category)));

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-6" dir={ALAZAB_BRANDING.direction}>
      <div
        className="rounded-3xl border border-base-300 bg-base-100/85 p-5 shadow-sm backdrop-blur md:p-7"
        style={{ borderTop: `4px solid ${ALAZAB_BRANDING.accentColor}` }}
      >
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: ALAZAB_BRANDING.accentColor }}>
              ALAZAB
            </p>
            <h1 className="text-2xl font-bold md:text-3xl" style={{ color: ALAZAB_BRANDING.primaryColor }}>
              {ALAZAB_BRANDING.productName}
            </h1>
            <p className="mt-1 text-sm text-base-content/60">بيئة العمل الموحدة لأنظمة العزب</p>
          </div>
          <a
            href="https://chatgpt.com"
            className="btn btn-sm border-0 text-white"
            style={{ backgroundColor: ALAZAB_BRANDING.primaryColor }}
          >
            فتح ChatGPT
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div key={category} className="rounded-2xl border border-base-300 bg-base-200/45 p-4">
              <h2 className="mb-3 text-sm font-bold" style={{ color: ALAZAB_BRANDING.primaryColor }}>
                {categoryLabels[category] ?? category}
              </h2>
              <div className="grid gap-2">
                {plugins
                  .filter((plugin) => plugin.category === category)
                  .map((plugin) => (
                    <a
                      key={plugin.id}
                      href={plugin.url}
                      className="flex items-center justify-between rounded-xl bg-base-100 px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:shadow"
                    >
                      <span>{plugin.name}</span>
                      <span className="text-xs text-base-content/40">↗</span>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
