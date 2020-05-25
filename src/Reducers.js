export const reducer = (state, action) => {
    switch(action.type) {
        case "APP_BUSY": {
            return {
                ...state,
                busy: true,
                message: undefined
            }
        }
        case "NETWORK_ERROR": {
            return {
                ...state,
                busy: false,
                message: {
                    kind: 'error',
                    title: 'Network Error',
                    text: 'Check your network connection.'
                }
            }
        }
        case "LOGIN_SUCCESS": {
            return {
                ...state,
                busy: false,
                user: action.payload,
                message: {
                    kind: 'success',
                    title: 'Login Success',
                    text: 'Successfully logged in.'
                }
            }
        }
        case "LOGIN_FAILED": {
            return {
                ...state,
                busy: false,
                message: {
                    kind: 'error',
                    title: 'Login Error',
                    text: 'Wrong email or password. Try again'
                }
            }
        }
        case "LOGOUT": {
            localStorage.setItem('stackhackv1', '');
            return {
                ...state,
                busy: false,
                user: undefined,
                message: {
                    kind: 'success',
                    title: 'Logout Success',
                    text: 'Successfully logged out.'
                }
            }
        }
        case "EVENTS_RETRIEVAL_SUCCESS": {
            return {
                ...state,
                busy: false,
                allEvents: action.payload,
                message: undefined
            }
        }
        case "EVENT_REGISTRATIONS_RETRIEVAL_SUCCESS": {
            return {
                ...state,
                busy: false,
                allRegistrations: action.payload,
                message: undefined
            }
        }
        case "EVENT_CREATION_SUCCESS": {
            let newAllEvents = state.allEvents.concat(action.payload)
            return {
                ...state,
                allEvents: newAllEvents,
                busy: false,
                message: {
                    kind: 'success',
                    title: 'Event Created',
                    text: 'Event created successfully.'
                }
            }
        }
        case "EVENT_REGISTRATION_CREATION_SUCCESS": {
            let newAllRegistrations = state.allRegistrations.concat(action.payload)
            return {
                ...state,
                allRegistrations: newAllRegistrations,
                busy: false,
                message: {
                    kind: 'success',
                    title: 'Event Registration Created',
                    text: 'Event registration created successfully.'
                }
            }
        }
        case "EVENT_UPDATION_SUCCESS": {
            return {
                ...state,
                busy: false,
                message: {
                    kind: 'success',
                    title: 'Event Updated',
                    text: 'Event updated successfully.'
                }
            }
        }
        case "EVENT_REGISTRATION_UPDATION_SUCCESS": {
            return {
                ...state,
                busy: false,
                message: {
                    kind: 'success',
                    title: 'Event Registration Updated',
                    text: 'Event registration updated successfully.'
                }
            }
        }
        case "EVENT_DELETION_SUCCESS": {
            let newAllEvents = state.allEvents.filter(event => {
                return event.eventId !== action.payload
            });
            return {
                ...state,
                busy: false,
                allEvents: newAllEvents,
                message: {
                    kind: 'success',
                    title: 'Event Deleted',
                    text: 'Event deleted successfully.'
                }
            }
        }
        case "EVENT_REGISTRATION_DELETION_SUCCESS": {
            let newAllRegistrations = state.allRegistrations.filter(registrations => {
                return registrations.regId !== action.payload
            });
            return {
                ...state,
                busy: false,
                allRegistrations: newAllRegistrations,
                message: {
                    kind: 'success',
                    title: 'Event Registration Deleted',
                    text: 'Event registration deleted successfully.'
                }
            }
        }
        default:
            return state;
    }
}