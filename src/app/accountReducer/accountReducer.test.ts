import {accountActions, accountReducer} from "./index";

const {debug, setCurrentPlan} = accountActions;

export type InitialStateType = {
    email: string,
    currentPlan: string,
}

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        email: 'dd@gmail.com',
        currentPlan: 'basic'
    }
});

test('correct email should be set', () => {
    const action = debug.fulfilled(startState.email, '');

    const endState = accountReducer(startState, action);
    expect(endState.email).toBe('dd@gmail.com');
});

test('correct plan should be set', () => {
    const action = setCurrentPlan({currentPlan: 'entry'})

    const endState = accountReducer(startState, action);
    expect(endState.currentPlan).toBe('entry');
});