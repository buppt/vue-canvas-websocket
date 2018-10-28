const state = {
    beginGame: false,
    drawUser:'',
    drawWord: '',
}

const mutations = {
    countDown: (state,msg) => {
        if(msg[0]=='begin'){
            state.beginGame=true;
            state.drawUser=msg[1];
            state.drawWord=msg[2];
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