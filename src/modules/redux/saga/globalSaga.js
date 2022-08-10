import { put, takeEvery } from 'redux-saga/effects';
import {loadSaga, type} from '../../../services';

function* dataSaga() {
	// yield takeEvery(types.User.LOAD_API_USERS_ME, loadSaga);
}
export default dataSaga;
