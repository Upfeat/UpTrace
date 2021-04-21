import { fireAuth } from '@/plugins/firebase.js'
import personRepo from '@/plugins/personRepo.js'
import placeRepo from '@/plugins/placeRepo.js'


export default context => {
  const { store } = context

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(user => {
      store.commit('setUser', user)
      if(user) {
        personRepo.checkForEmail(user.email).then(found => {
          if(found) {
            store.commit('setPersonRegistered',true)
          }
        })
        placeRepo.checkForEmail(user.email).then(found => {
          if(found) {
            store.commit('setPlaceRegistered',true)
          }
        })

      }
      resolve()
    })
  })
}
