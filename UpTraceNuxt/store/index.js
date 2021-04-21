import { fireAuth } from '@/plugins/firebase.js'

export const strict = false

export const state = () => ({
  user: null,
  personRegistered: false,
  placeRegistered: false,
})

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setPersonRegistered(state, payload) {
    state.personRegistered = payload
  },
  setPlaceRegistered(state, payload) {
    state.placeRegistered = payload
  },
}

export const actions = {
  signOut({ commit }) {
    fireAuth
      .signOut()
      .then(() => {
        commit('setUser', null)
      })
      .catch(err => alert(err))
  }
}
