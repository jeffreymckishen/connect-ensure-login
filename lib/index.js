import ensureLoggedIn from './ensureLoggedIn.js';
import ensurePopup from './ensurePopup.js';
import ensureNotLoggedIn from './ensureLoggedOut.js';

const connectEnsure = {
  ensureLoggedIn,
  ensurePopup,
  ensureNotLoggedIn
};

export default connectEnsure;