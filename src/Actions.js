const serverURL= "https://hackstack-backend.herokuapp.com";

export const setBusy = async() => {
    return resp => {
        resp({
            type: "APP_BUSY"
        });
    }
}

export const loginUser = async(email, password) => {
    return user => {
        fetch(`${serverURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(data => {
            return data.json();
        }).then(body => {
            if(body){
                user({
                    type: "LOGIN_SUCCESS",
                    payload: body
                });
            } else {
                user({
                    type: "LOGIN_FAILED"
                });
            }
        }).catch(err => {
            console.log('error while logging in', err);
            user({
                type: "LOGIN_FAILED"
            });
        });
    }
}

export const retrieveEvents = async() => {
    return events => {
        fetch(`${serverURL}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => {
            return data.json();
        }).then(body => {
            if(body){
                events({
                    type: "EVENTS_RETRIEVAL_SUCCESS",
                    payload: body
                });
            } else {
                events({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            events({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const retrieveEventRegistrations = async() => {
    return registrations => {
        fetch(`${serverURL}/registrations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => {
            return data.json();
        }).then(body => {
            if(body){
                registrations({
                    type: "EVENT_REGISTRATIONS_RETRIEVAL_SUCCESS",
                    payload: body
                });
            } else {
                registrations({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            registrations({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const createEvent = async(data) => {
    return event => {
        fetch(`${serverURL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data => {
            return data.json();
        }).then(body => {
            if(body){
                event({
                    type: "EVENT_CREATION_SUCCESS",
                    payload: body
                });
            } else {
                event({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            event({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const createEventRegistration = async(data) => {
    return registration => {
        fetch(`${serverURL}/registrations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data => {
            return data.json();
        }).then(body => {
            if(body){
                registration({
                    type: "EVENT_REGISTRATION_CREATION_SUCCESS",
                    payload: body
                });
            } else {
                registration({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            registration({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const updateEvent = async(data) => {
    return event => {
        fetch(`${serverURL}/events`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data => {
            if(data.ok){
                event({
                    type: "EVENT_UPDATION_SUCCESS"
                });
            } else {
                event({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            event({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const updateEventRegistration = async(data) => {
    return registration => {
        fetch(`${serverURL}/registrations`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data => {
            if(data.ok){
                registration({
                    type: "EVENT_REGISTRAION_UPDATION_SUCCESS"
                });
            } else {
                registration({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            registration({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const removeEvent = async(eventId) => {
    return event => {
        fetch(`${serverURL}/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => {
            if(data.ok){
                event({
                    type: "EVENT_DELETION_SUCCESS",
                    payload: eventId
                });
            } else {
                event({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            event({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const removeEventRegistration = async(regId) => {
    return registration => {
        fetch(`${serverURL}/registrations/${regId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => {
            if(data.ok){
                registration({
                    type: "EVENT_REGISTRATION_DELETION_SUCCESS",
                    payload: regId
                });
            } else {
                registration({
                    type: "NETWORK_ERROR"
                });
            }
        }).catch(err => {
            console.log('network error', err);
            registration({
                type: "NETWORK_ERROR"
            });
        });
    }
}

export const logoutUser = async() => {
    return user => {
        user({
            type: "LOGOUT",
        })
    }
}