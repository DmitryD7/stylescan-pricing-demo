import {accountActions, accountReducer} from "./index";
import {CurrentPlanType} from "./accountReducer";

const {debug, setCurrentPlan, setIsEnterprisePending} = accountActions;

export type InitialStateType = {
    email: string,
    currentPlan: CurrentPlanType,
    isEnterprisePending: boolean,
}

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        email: 'dd@gmail.com',
        currentPlan: 'Basic',
        isEnterprisePending: false
    }
});

test('correct email should be set', () => {
    const action = debug.fulfilled(startState.email, '');

    const endState = accountReducer(startState, action);
    expect(endState.email).toBe('dd@gmail.com');
});

test('correct plan should be set', () => {
    const action = setCurrentPlan({currentPlan: 'Entry'});

    const endState = accountReducer(startState, action);
    expect(endState.currentPlan).toBe('Entry');
});

test('correct value of EnterprisePending must be set', () => {
    const action = setIsEnterprisePending({isEnterprisePending: true});

    const endState = accountReducer(startState, action);

    expect(endState.isEnterprisePending).toBeTruthy();
});