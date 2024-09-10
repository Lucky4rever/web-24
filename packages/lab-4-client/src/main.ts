import './style.css';
import { registerBrowserBackAndForth, renderInitialPage } from './utils/content.ts';

(function bootup() {
  registerBrowserBackAndForth();
  renderInitialPage();
})();
