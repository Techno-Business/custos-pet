import types from './types';

export function setReducer(key, payload) {
  return { type: types.SET_REDUCER, key, payload };
}
  
export function setUser(payload) {
  return { type: types.SET_USER, payload };
}
  
export function saveUser() {
  return { type: types.SAVE_USER };
}
  
export function loginUser() {
  return { type: types.LOGIN_USER };
}

export function setPet(payload) {
  return { type: types.SET_PET, payload };
}
  
export function savePet() {
  return { type: types.SAVE_PET };
}
   
export function setForm(payload) {
  return { type: types.SET_FORM, payload };
}

export function getPet() {
  return { type: types.GET_PET };
}
  
export function reset(key) {
  return { type: types.RESET, key };
}
  