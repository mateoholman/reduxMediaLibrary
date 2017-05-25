import { put, call } from 'redux-saga/effects';
import { flickrImages, shutterStockVideos } from '../Api/api';
import * as types from '../constants/actionTypes';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middleware on the next line of action,
// for success or failure operation.It is called by the watcher saga
// each time SEARCH_MEDIA_REQUEST is dispatched to store.
// When searchMediaSaga is called, it makes a call to the API with the payload.
// Then, the result of the promise(resolved or rejected) and an action object
// is yielded to the reducer using the put effect creator. Put instructs
// Redux-saga middleware on what action to dispatch.
export function* searchMediaSaga({ payload }) {
  try {
    const videos = yield call(shutterStockVideos, payload);
    const images = yield call(flickrImages, payload);
    // Notice, we’re yielding an array of effects. This is because we want them
    // to run concurrently. The default behaviour would be to pause after each
    // yield statement which is not the behaviour we intend.
    yield [
      put({ type: types.SHUTTER_VIDEOS_SUCCESS, videos }),
      put({ type: types.SELECTED_VIDEO, video: videos[0] }),
      put({ type: types.FLICKR_IMAGES_SUCCESS, images }),
      put({ type: types.SELECTED_IMAGE, image: images[0] })
    ];
  } catch (error) {
    // If any of the operations fail, we yield a failure action object to the
    // reducer.
    yield put({ type: 'SEARCH_MEDIA_ERROR', error });
  }
}
