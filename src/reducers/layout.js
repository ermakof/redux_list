/**
 * Created by ab.ermakof on 12.10.17.
 */
const initialState = {
    isOpen: true
};

export default function layout(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        default:
            return state;
    }
    return state;
}

