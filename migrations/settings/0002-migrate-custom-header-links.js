export default function migrate(settings) {
  const oldSetting = settings.get("custom_header_links");

  // Do nothing if setting is already an array which means user has saved the setting in the new format
  // This is required because there was a bug in core where this migration would fail but the theme was still updated
  // allowing the users to save the setting in the new format.
  if (Array.isArray(oldSetting)) {
    return settings;
  }

  if (typeof oldSetting === "string") {
    const newLinks = [];

    oldSetting.split("|").forEach((link) => {
      const [text, title, url, view, target, hideOnScroll, locale] = link
        .split(",")
        .map((s) => s.trim());

      if (text && url) {
        const newLink = {
          text,
          url,
        };

        if (title) {
          newLink.title = title;
        }

        if (["vdm", "vdo", "vmo"].includes(view)) {
          newLink.view = view;
        } else {
          newLink.view = "vdm";
        }

        if (["blank", "self"].includes(target)) {
          newLink.target = target;
        } else {
          newLink.target = "blank";
        }

        if (["remove", "keep"].includes(hideOnScroll)) {
          newLink.hide_on_scroll = hideOnScroll;
        } else {
          newLink.hide_on_scroll = "keep";
        }

        if (locale) {
          newLink.locale = locale;
        }

        newLinks.push(newLink);
      }
    });

    settings.set("custom_header_links", newLinks);
  }

  return settings;
}
