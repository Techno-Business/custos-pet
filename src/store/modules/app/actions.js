import types from "./types";

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

export function setCost(payload) {
  return { type: types.SET_COST, payload };
}

export function setEvent(payload) {
  return { type: types.SET_EVENT, payload };
}

export function saveCost() {
  return { type: types.SAVE_COST };
}

export function saveEvent() {
  return { type: types.SAVE_EVENT };
}

export function getCost() {
  return { type: types.GET_COST };
}

export function reset(key) {
  return { type: types.RESET, key };
}
