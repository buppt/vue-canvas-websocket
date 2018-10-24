const state = {
    username: '',
    count:0
}

const mutations = {
    getUsername: state => state.username,
    setUsername: (state,username) => {
        state.username=username;
    },
    increment (state, n) {
        state.count += n
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}