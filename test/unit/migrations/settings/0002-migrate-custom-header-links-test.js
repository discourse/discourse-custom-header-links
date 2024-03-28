import { module, test } from "qunit";
import migrate from "../../../../migrations/settings/0002-migrate-custom-header-links";

module(
  "Unit | Migrations | Settings | 0002-migrate-custom-header-links",
  function () {
    test("migrate", function (assert) {
      const settings = new Map(
        Object.entries({
          custom_header_links:
            "External link, this link will open in a new tab, https://meta.discourse.org, vdo, blank, remove|Most Liked, Posts with the most amount of likes, /latest/?order=op_likes, vdo, self, keep|Privacy, Our Privacy Policy, /privacy, vdm, self, keep, en",
        })
      );

      const result = migrate(settings);

      const expectedResult = new Map(
        Object.entries({
          custom_header_links: [
            {
              text: "External link",
              title: "this link will open in a new tab",
              url: "https://meta.discourse.org",
              view: "vdo",
              target: "blank",
              hide_on_scroll: "remove",
            },
            {
              text: "Most Liked",
              title: "Posts with the most amount of likes",
              url: "/latest/?order=op_likes",
              view: "vdo",
              target: "self",
              hide_on_scroll: "keep",
            },
            {
              text: "Privacy",
              title: "Our Privacy Policy",
              url: "/privacy",
              view: "vdm",
              target: "self",
              hide_on_scroll: "keep",
              locale: "en",
            },
          ],
        })
      );

      assert.deepEqual(Array.from(result), Array.from(expectedResult));
    });
  }
);
