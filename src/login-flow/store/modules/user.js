import Cookies from '@/utils/util.cookie'
import { login, logout, getInfo } from '@/api/user'
const state = {
  token: Cookies.get('token'),
  userInfo: ''
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  login ({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password.trim()
      })
        .then(data => {
          commit('SET_TOKEN', data.token)
          Cookies.set('token', data.token)
          dispatch('getInfo')
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          Cookies.remove('token')
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(data => {
          if (!data) {
            reject(new Error('Verification failed, please Login again.'))
          }

          commit('SET_USERINFO', data.userInfo)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
