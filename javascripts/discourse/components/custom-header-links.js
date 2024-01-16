import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { dasherize } from "@ember/string";

export default class CustomHeaderLinks extends Component {
  @service themeStore;
  @tracked loading = true;

  customHeaderLinks;

  constructor() {
    super(...arguments);

    this.themeStore
      .fetch(16, "custom_header_links")
      .then((result) => {
        this.customHeaderLinks = result;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  get shouldShow() {
    return !this.loading && this.customHeaderLinks?.length > 0;
  }

  get links() {
    return this.customHeaderLinks.reduce((result, item) => {
      const linkText = item.name;
      const linkTitle = item.title;
      const linkHref = item.url;
      const device = item.device;
      const target = item.target || "";
      const keepOnScroll = item.hide_on_scroll;
      const locale = item.locale;

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
