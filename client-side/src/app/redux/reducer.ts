import { AppState } from './appState';
import { Action } from './action';
import { ActionType } from './actionType';

export class Reducer {

    public static reduce(oldState: AppState, action: Action): AppState {

        let newState = { ...oldState };

        switch (action.type) {

            case ActionType.getUser:
                newState.connectedUser = action.payload;
                break;

            case ActionType.logOut:
                newState.connectedUser = undefined
                break;

            case ActionType.addItemTocart:

                newState.items.push(action.payload);
                break;


            case ActionType.updateItemsFromCart:
                for (let i = 0; i < newState.items.length; i++) {
                    if (newState.items[i]._id === action.payload._id) {
                        newState.items[i] = action.payload;
                        break;
                    }
                }
                break;

            case ActionType.deleteItemFromCart:
                for (let i = 0; i < newState.items.length; i++) {
                    if (newState.items[i]._id === action.payload._id) {
                        newState.items.splice(i, 1);
                        break;
                    }
                }
                break;

            case ActionType.deleteAllItemsFromCart:
                let itemsQuantity = newState.items.length - 1;
                for (let i = itemsQuantity; i >= 0; i--) {
                    newState.items.splice(i, 1);
                }
                break;
        }

        return newState;
    }
}