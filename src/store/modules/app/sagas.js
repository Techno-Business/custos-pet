import { Alert } from 'react-native';

import types from './types';
import { takeLatest, all, select, put, call } from 'redux-saga/effects';
import { setForm, reset, setReducer } from './actions';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from './../../../services/api';
import util from '../../../util';

import { replace } from '../../../services/navigation';

export function* loginUser() {
    const { userForm } = yield select((state) => state.app);

    yield put(setForm({ loading: true }));

    try {
        const { data: res } = yield call(api.post, `owner/signin`, userForm)

        if (res.error) throw new Error(res.message);
           
        yield call(AsyncStorage.setItem, '@user', JSON.stringify(res.owner));
        yield put(setReducer('user', res.owner));
        yield put(reset('userForm'));
        yield call(replace, 'Home');
        
    } catch (err) {
        yield call(Alert.alert, 'Internal error', err.message);
    } finally {
        yield put(setForm({ loading: false }));
    }
}

export function* saveUser() {
    const { userForm } = yield select((state) => state.app);

    yield put(setForm({ saving: true }));

    try {
        const { data: res } = yield call(api.post, `/owner/signup`, userForm);

        if (res.error) throw new Error(res.message);

        yield put(reset('userForm'));
        yield call(replace, 'Login');

    } catch (err) {
        yield call(Alert.alert, 'Internal error', err.message);
    } finally {
        yield put(setForm({ saving: false }));
    }
}

export function* savePet() {
    const { petForm, user } = yield select((state) => state.app);

    yield put(setForm({ saving: true }));
  
    try {
      const form = new FormData();
      form.append('ownerId', user?._id);
      form.append('name', petForm?.name);
      form.append('photo', {
        name: new Date().getTime() + '.' + util.getMimeType(petForm?.photo?.uri),
        type: `image/${util.getMimeType(petForm?.photo?.uri)}`,
        uri: petForm?.photo?.uri,
      });
      form.append('weight', petForm?.weight);
      form.append('age', petForm?.age);
      form.append('sex', petForm?.sex);
      form.append('species', petForm?.species);
      form.append('breed', petForm?.breed);
      
  
      const { data: res } = yield call(api.post, `/pet/addpet`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.error) {
        Alert.alert('Ops!', res.message, [
          {
            text: 'Try again',
            onPress: () => {},
          },
        ]);
        return false;
      }
  
      yield put(reset('petForm'));
      yield call(replace, 'Home');
  
      Alert.alert(
        'Pet added successfully!',
        'Your pet can be consulted now',
        [
          {
            text: 'Back to home',
            onPress: async () => {},
          },
        ]
      );
    } catch (err) {
      Alert.alert('Internal error', err.message);
    } finally {
      yield put(setForm({ saving: false }));
    }
}

export function* getPet() {
    const { user } = yield select((state) => state.app);

    yield put(setForm({ loading: true }));

    try {
        const { data: res } = yield call(api.get, `/owner/pets/${user?._id}`);

        if (res.error) {
            return false;
        }

        yield put(setReducer('pet', res));
    } catch (err) {
        Alert.alert('Internal error', err.message);
    } finally {
        yield put(setForm({ loading: false }));
    }
}

export default all([
    takeLatest(types.LOGIN_USER, loginUser),
    takeLatest(types.SAVE_USER, saveUser),
    takeLatest(types.SAVE_PET, savePet),
    takeLatest(types.GET_PET, getPet),
]);