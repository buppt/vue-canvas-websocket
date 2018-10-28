const state = {
    beginGame: false,
    drawUser:'',
    second: 3,
}

const mutations = {
    countDown: (state,msg) => {
        if(msg[0]=='begin'){
            state.beginGame=true;
            state.drawUser=msg[1];
        }else if(msg[0]=='end'){
            state.beginGame=false;
        }
    },
    
}

export default {
    namespaced: true,
    state,
    mutations,
}