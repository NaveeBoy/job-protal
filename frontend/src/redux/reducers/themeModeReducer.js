

export const modeReducer = (state = {togglective:true}, action) =>{
    switch (action.type) {
        case THEME_MODE:
            return{
                ...state,
                togglective : ! state.togglective,
                mode: state.togglective ? "light" :"dark" 
            }
    
        default:
            return state ;
    }
}

