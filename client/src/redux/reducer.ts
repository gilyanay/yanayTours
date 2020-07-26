import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

// This function is NOT called direcrtly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
    // Cloning the oldState (creating a copy)
    const newAppState = { ...oldAppState };

    switch (action.type) {
    
        case ActionType.onLogIn:
            newAppState.isLogedIn = action.payload;
        break;
        case ActionType.GetAllVacation:
            newAppState.vacations = action.payload;
            console.log(newAppState.vacations)
        break;
        case ActionType.Settoken:
            newAppState.token = action.payload;
            console.log(newAppState.token)
        break;
            

    }

    // After returning the new state, it's being published to all subscribers
    // Each component will render itself based on the new state
    return newAppState;
}