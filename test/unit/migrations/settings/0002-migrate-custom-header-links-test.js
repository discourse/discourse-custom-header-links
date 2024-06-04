import { module, test } from "qunit";
import migrate from "../../../../migrations/settings/0002-migrate-custom-header-links";

module(
  "Custom Header Links | Migrations | Settings | 0002-migrate-custom-header-links",
  function () {
    test("migrate when value of setting is already an array", function (assert) {
      const settings = new Map(
        Object.entries({
          custom_header_links: [
            {
              text: "Some link",
              title: "Some link title",
              url: "https://some.url.com",
              view: "vdo",
              target: "blank",
              hide_on_scroll: "remove",
            },
          ],
        })
      );

      const result = migrate(settings);

      const expectedResult = new Map(
        Object.entries({
          custom_header_links: [
            {
              text: "Some link",
              title: "Some link title",
              url: "https://some.url.com",
              view: "vdo",
              target: "blank",
              hide_on_scroll: "remove",
            },
          ],
        })
      );

      assert.deepEqual(
        Object.fromEntries(result.entries()),
        Object.fromEntries(expectedResult.entries())
      );
    });

    test("migrate when old setting value is invalid", function (assert) {
      const settings = new Map(
        Object.entries({
          custom_header_links:
            "Invalid Link|Invalid Link 2, some title|Invalid Link 3, , ,",
        })
      );

      const result = migrate(settings);

      const expectedResult = new Map(
        Object.entries({ custom_header_links: [] })
      );

      assert.deepEqual(
        Object.fromEntries(result.entries()),
        Object.fromEntries(expectedResult.entries())
      );
    });

    test("migrate when `hide_on_scroll` attribute is invalid", function (assert) {
      const settings = new Map(
        Object.entries({
          custom_header_links:
            "External link, this link will open in a new tab, https://meta.discourse.org, vdo, blank, invalid",
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
              hide_on_scroll: "keep",
            },
          ],
        })
      );

      assert.deepEqual(
        Object.fromEntries(result.entries()),
        Object.fromEntries(expectedResult.entries())
      );
    });

    test("migrate when `target` attribute is invalid", function (assert) {
      const settings = new Map(
        Object.entries({
          custom_header_links:
            "External link, this link will open in a new tab, https://meta.discourse.org, vdo, invalid, remove",
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
          ],
        })
      );

      assert.deepEqual(
        Object.fromEntries(result.entries()),
        Object.fromEntries(expectedResult.entries())
      );
    });

    test("migrate when `view` attribute is invalid", function (assert) {
      const settings = new Map(
        Object.entries({
          custom_header_links:
            "External link, this link will open in a new tab, https://meta.discourse.org, invalid, blank, remove",
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
              view: "vdm",
              target: "blank",
              hide_on_scroll: "remove",
            },
          ],
        })
      );

      assert.deepEqual(
        Object.fromEntries(result.entries()),
        Object.fromEntries(expectedResult.entries())
      );
    });

    test("migrate when title is not provided", function (assert) {
      const settings = new Map(
        Object.entries({
          custom_header_links: "External link, , https://meta.discourse.org",
        })
      );

      const result = migrate(settings);

      const expectedResult = new Map(
        Object.entries({
          custom_header_links: [
            {
              text: "External link",
              url: "https://meta.discourse.org",
              view: "vdm",
              target: "blank",
              hide_on_scroll: "keep",
            },
          ],
        })
      );

      assert.deepEqual(
        Object.fromEntries(result.entries()),
        Object.fromEntries(expectedResult.entries())
      );
    });

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
