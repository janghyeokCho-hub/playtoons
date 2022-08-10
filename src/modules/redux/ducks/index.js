import { combineReducers } from 'redux';
import root, { rootTypes, rootAction } from './root';
import auth, { authTypes, authAction } from './auth';

import loading from './loading';

export const type = {
	root: rootTypes,
	auth: authTypes,
};

export const action = {
	root: rootAction,
	auth: authAction,
};

export default combineReducers({
	root,
	loading,
	auth,
});
