function commonReducerFunc(identifier) {
    const staticReducers = (state = {}, action) => {
        switch (action.type) {
            case `${identifier}`:
                return Object.assign({}, state, {
                    type: action.type,
                    lookUpData: action.data
                });
        }
        return state;
    }
    return staticReducers
}



export default commonReducerFunc;