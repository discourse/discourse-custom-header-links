import { apiInitializer } from "discourse/lib/api";
import CustomHeaderLinks from "../components/custom-header-links";

export default apiInitializer((api) => {
  api.renderInOutlet("before-header-panel", CustomHeaderLinks);
});
