# frozen_string_literal: true

require_relative "page_objects/components/custom_header_link"

RSpec.describe "Viewing Custom Header Links", system: true do
  fab!(:theme) { upload_theme_component }
  let!(:custom_header_link) { PageObjects::Components::CustomHeaderLink.new }

  it "should display the custom header links" do
    visit("/")

    expect(custom_header_link).to be_visible

    expect(custom_header_link).to have_custom_header_link(
      "External link",
      href: "https://meta.discourse.org",
      title: "this link will open in a new tab",
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
