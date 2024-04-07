# frozen_string_literal: true

require_relative "page_objects/components/custom_header_link"

RSpec.describe "Viewing Custom Header Links", system: true do
  fab!(:theme) { upload_theme_component }
  let!(:custom_header_link) { PageObjects::Components::CustomHeaderLink.new }

  context "when glimmer headers are enabled" do
    before do
      if SiteSetting.respond_to?(:experimental_glimmer_header_groups)
        SiteSetting.experimental_glimmer_header_groups = Group::AUTO_GROUPS[:everyone]
      else
        SiteSetting.glimmer_header_mode = "enabled"
      end
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

  context "when glimmer headers are disabled" do
    before do
      if SiteSetting.respond_to?(:experimental_glimmer_header_groups)
        SiteSetting.experimental_glimmer_header_groups = nil
      else
        SiteSetting.glimmer_header_mode = "disabled"
      end
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
end
