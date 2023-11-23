export default function migrate(settings) {
  if (settings.has("Custom_header_links")) {
    const oldList = settings.get("Custom_header_links").split("|");

    const newList = oldList.map((item) => {
      let [text, title, url, view, target, hideOnScroll, locale] = item
        .split(",")
        .map((s) => s.trim());

      switch (view) {
        case "vmo":
          view = "mobile";
          break;
        case "vdo":
          view = "desktop";
          break;
        default:
          view = "all";
      }

      return {
        text,
        title,
        url,
        view,
        open_in_new_tab: target !== "self",
        keep_on_scroll: hideOnScroll === "keep",
        locale: locale || "",
      };
    });
    settings.delete("Custom_header_links");
    settings.set("links", JSON.stringify(newList));
  }
  return settings;
}
