import { h } from "virtual-dom";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-custom-header-links",

  initialize() {
    withPluginApi("0.8.20", (api) => {
      const customHeaderLinks = settings.Custom_header_links;
      if (!customHeaderLinks.length) {
        return;
      }

      const linksPosition =
        settings.links_position === "right"
          ? "header-buttons:before"
          : "home-logo:after";

      const headerLinks = [];

      customHeaderLinks
        .split("|")
        .filter(Boolean)
        .map((customHeaderLinksArray) => {
          const [
            linkText,
            linkTitle,
            linkHref,
            device,
            target,
            keepOnScroll,
          ] = customHeaderLinksArray
            .split(",")
            .filter(Boolean)
            .map((x) => x.trim());

          const deviceClass = `.${device}`;
          const linkTarget = target === "self" ? "" : "_blank";
          const keepOnScrollClass = keepOnScroll === "keep" ? ".keep" : "";
          const linkClass = `.${linkText
            .toLowerCase()
            .replace(/\s/gi, "-")}-custom-header-links`;

          const anchorAttributes = {
            title: linkTitle,
            href: linkHref,
          };
          if (linkTarget) {
            anchorAttributes.target = linkTarget;
          }

          headerLinks.push(
            h(
              `li.headerLink${deviceClass}${keepOnScrollClass}${linkClass}`,
              h("a", anchorAttributes, linkText)
            )
          );
        });

      api.decorateWidget(linksPosition, (helper) => {
        return helper.h("ul.custom-header-links", headerLinks);
      });

      api.decorateWidget("home-logo:after", (helper) => {
        const dHeader = document.querySelector(".d-header");

        if (!dHeader) {
          return;
        }

        const isTitleVisible = helper.attrs.minimized;
        if (isTitleVisible) {
          dHeader.classList.add("hide-menus");
        } else {
          dHeader.classList.remove("hide-menus");
        }
      });
    });
  },
};
