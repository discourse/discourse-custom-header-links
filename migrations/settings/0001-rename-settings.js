export default function migrate(settings) {
  if (settings.has("Custom_header_links")) {
    settings.set("custom_header_links", settings.get("Custom_header_links"));
    settings.delete("Custom_header_links");
  }

  return settings;
}
