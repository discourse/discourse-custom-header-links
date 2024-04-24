export default function migrate(settings) {
  const oldSetting = settings.get("custom_header_links");

  if (oldSetting) {
    const newSetting = oldSetting.split("|").map((link) => {
      const [text, title, url, view, target, hide_on_scroll, locale] = link
        .split(",")
        .map((s) => s.trim());

      const newLink = {
        text,
        title,
        url,
        view,
        target,
        hide_on_scroll,
        locale,
      };

      Object.keys(newLink).forEach((key) => {
        if (newLink[key] === undefined) {
          delete newLink[key];
        }
      });

      return newLink;
    });

    settings.set("custom_header_links", newSetting);
  }

  return settings;
}
