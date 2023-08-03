import Component from "@glimmer/component";
import { dasherize } from "@ember/string";

export default class CustomHeaderLinks extends Component {
  get shouldShow() {
    return settings.Custom_header_links?.length > 0;
  }

  get links() {
    return settings.Custom_header_links.split("|").reduce((result, item) => {
      let [
        linkText,
        linkTitle,
        linkHref,
        device,
        target = "",
        keepOnScroll,
        locale,
      ] = item.split(",").map((s) => s.trim());

      if (!linkText || (locale && document.documentElement.lang !== locale)) {
        return result;
      }

      const linkClass = `${dasherize(linkText)}-custom-header-links`; // legacy name

      const anchorAttributes = {
        title: linkTitle,
        href: linkHref,
        target: target === "self" ? "" : "_blank",
      };

      result.push({
        device: `headerLink--${device}`,
        keepOnScroll: `headerLink--${keepOnScroll}`,
        locale: `headerLink--${locale}`,
        linkClass,
        anchorAttributes,
        linkText,
      });

      return result;
    }, []);
  }
}
