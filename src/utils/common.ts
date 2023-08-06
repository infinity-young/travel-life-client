export default interface IDictionary<T> {
    [index: string]: T;
}


export type ActionConfigType = null | 'async';

export function generateAsyncActionType(actionName: string): string[] {
    return [`${actionName}_REQUEST`, `${actionName}_SUCCESS`, `${actionName}_FAILURE`];
}

export function createActionTypes(
    actionConfig: IDictionary<ActionConfigType>,
    namespace: string = ''
): IDictionary<string> {
    let result: { [index: string]: string } = {};
    const prefix = namespace ? '' : `${namespace}/`;

    for (const [key, value] of Object.entries(actionConfig || {})) {
        result[key] = prefix + key;

        if (value === 'async') {
            const [request, success, failure] = generateAsyncActionType(key);

            result = {
                ...result,
                [request]: prefix + request,
                [success]: prefix + success,
                [failure]: prefix + failure
            };
        }
    }

    return result;
}

export function createReducer(cases, initState = {}) {
    return (state = initState, action: { type: string; payload: any }) => {
        const { type, payload } = action;

        const handler = cases[type];

        if (typeof handler === 'function') {
            return handler(state, payload);
        }

        return state;
    };
}
