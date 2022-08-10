import { type, store } from '../services';

const showLoading = () => store.dispatch({ type: type.root.SHOW_LOADING });

const hideLoading = () => store.dispatch({ type: type.root.HIDE_LOADING });

const root = {
	showLoading,
	hideLoading,
};

export default root;
