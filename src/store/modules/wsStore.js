const state = {
    ws: null,
    seats: ['空位','空位','空位','空位','空位','空位'],
    chat:[],
    draw:[]
}

const mutations = {
    connect: (state,ws) => {
        state.ws = ws
    },
    changeSeats: (state,msg) => {
        state.seats=msg;
    },
    acceptChat: (state,msg)=>{
        state.chat = msg;
    },
    acceptDraw: (state,msg)=>{
        state.draw = msg;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}