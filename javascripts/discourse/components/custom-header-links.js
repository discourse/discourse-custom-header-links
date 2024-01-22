import Component from "@glimmer/component";
import { dasherize } from "@ember/string";

export default class CustomHeaderLinks extends Component {
  get shouldShow() {
    return settings.links?.length > 0;
  }

  get links() {
    return settings.links.reduce((result, link) => {
      const linkText = link.text;
      const linkTitle = link.title;
      const linkHref = link.url;
      const target = link.target;
      const keepOnScroll = link.hide_on_scroll;
      const locale = link.locale;
      const device = link.view;

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
        linkClass,
        anchorAttributes,
        linkText,
      });

      return result;
    }, []);
  }
}
