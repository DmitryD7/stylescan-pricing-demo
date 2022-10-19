import {debug} from "./accountReducer";
import {accountReducer} from "./index";

export type InitialStateType = {
    email: string
}

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        email: 'dd@gmail.com'
    }
});

test('correct email should be set', () => {
    const action = debug.fulfilled(startState.email, '');

    const endState = accountReducer(startState, action);
    expect(endState.email).toBe('dd@gmail.com');
});