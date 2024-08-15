# frozen_string_literal: true

require_relative "page_objects/components/custom_header_link"

RSpec.describe "Viewing Custom Header Links", system: true do
  fab!(:theme) { upload_theme_component }
  let!(:custom_header_link) { PageObjects::Components::CustomHeaderLink.new }

  before do
    theme.update_setting(
      :custom_header_links,
      [
        {
          text: "External link",
          title: "This link will open in a new tab",
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
        },
      ],
    )

    theme.save!
  end

  it "should display the custom header links" do
    visit("/")

    expect(custom_header_link).to be_visible

    expect(custom_header_link).to have_custom_header_link(
      "External link",
      href: "https://meta.discourse.org",
      title: "This link will open in a new tab",
    )

    expect(custom_header_link).to have_custom_header_link(
      "Most Liked",
      href: "/latest/?order=op_likes",
      title: "Posts with the most amount of likes",
    )

    expect(custom_header_link).to have_custom_header_link(
      "Privacy",
      href: "/privacy",
      title: "Our Privacy Policy",
    )
  end
end
