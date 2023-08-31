# frozen_string_literal: true

module PageObjects
  module Components
    class CustomHeaderLink < PageObjects::Components::Base
      CUSTOM_HEADER_LINKS_SELECTOR = ".before-header-panel-outlet .custom-header-links"

      def visible?
        has_css?(CUSTOM_HEADER_LINKS_SELECTOR)
      end

      def has_custom_header_link?(link_name, title:, href:)
        expect(find(CUSTOM_HEADER_LINKS_SELECTOR)).to have_link(link_name, href:, title:)
      end
    end
  end
end
