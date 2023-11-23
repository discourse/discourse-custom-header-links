import Component from "@glimmer/component";
import { dasherize } from "@ember/string";
import { inject as service } from "@ember/service";

export default class CustomHeaderLinks extends Component {
  @service site;

  get shouldShow() {
    return JSON.parse(settings.links).length > 0;
  }

  get links() {
    return JSON.parse(settings.links).reduce((result, item) => {
      const {
        text: linkText,
        title: linkTitle,
        url: linkHref,
        view,
        open_in_new_tab: openInNewTab,
        keep_on_scroll: keepOnScroll,
        locale,
      } = item;

      if (!linkText || (locale && document.documentElement.lang !== locale)) {
        return result;
      }

      if (view === "desktop" && this.site.mobileView) {
        return result;
      }
      if (view === "mobile" && !this.site.mobileView) {
        return result;
      }

      const classes = [
        `${dasherize(linkText)}-custom-header-links`, // legacy name
        `headerLink--${keepOnScroll ? "keep" : "remove"}`,
      ];

      if (locale) {
        classes.push(`headerLink--${locale}`);
      }

      const anchorAttributes = {
        title: linkTitle,
        href: linkHref,
        target: openInNewTab ? "_blank" : "self",
      };

      result.push({
        class: classes.join(" "),
        anchorAttributes,
        linkText,
      });

      return result;
    }, []);
  }
}
