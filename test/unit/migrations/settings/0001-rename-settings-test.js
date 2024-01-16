import { module, test } from "qunit";
import migrate from "../../../../migrations/settings/0001-rename-settings";

module("Unit | Migrations | Settings | 0001-rename-settings", function () {
  test("migrate", function (assert) {
    const settings = new Map(
      Object.entries({
        Custom_header_links: "some,links",
      })
    );

    const result = migrate(settings);

    assert.deepEqual(
      Array.from(result),
      Array.from(
        new Map(
          Object.entries({
            custom_header_links: "some,links",
          })
        )
      )
    );
  });
});
