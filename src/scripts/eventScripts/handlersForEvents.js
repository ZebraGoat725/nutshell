import HTMLFactory from "../HTMLFactory";
import createEventForm from "./createEventForm";
import editEventForm from "./editEventForm";
import eventsData from "./eventsDataManager";
import eventHTML from "./eventHTML";

// Author: Chris Morgan

// Target the container for the events
const eventSection = document.querySelector("#events-section");

//Factory function that is used for editing events, creates the structure for the JSON database to store
const eventObjectBuilder = (userId, eventName, eventDate, eventLocation) => {
    let eventObj = {
        userId: userId,
        eventName: eventName,
        url: "",
        eventDate: eventDate,
        eventLocation: eventLocation
    };
    return eventObj;
};


// These are the handler functions for all the buttons in the event section.
const handlersForEvents = {
    //Clears the event section, then appends the value of the eventFormBuilder function which is the html for the create event form. This makes the create event form to appear.
    createNewEventHandler: () => {
        HTMLFactory.clearContainer(eventSection);
        eventSection.appendChild(createEventForm.eventFormBuilder());
    },
    //Clears the event section, then appends the value of the editEventFormBuilder which is the html for the edit event form. This makes the edit form appear.
    editEventHandler: () => {
        HTMLFactory.clearContainer(eventSection);
        eventSection.appendChild(editEventForm.editEventFormBuilder());
    },
    // The submitNewEventHandler is meant to carry out the functionality of creating a new event. It will target the input, create the object for JSON to store, then post the object to the events collection in our database. Then it will clear the section and show the updated list of events.
    submitNewEventHandler: () => {
        let userID = sessionStorage.getItem("userID");
        const eventNameInput = document.querySelector("#createEvent-nameInput");
        const eventDateInput = document.querySelector("#createEvent-dateInput");
        const eventLocationInput = document.querySelector("#createEvent-locationInput");
        eventsData.postEvent(eventObjectBuilder(Number(userID), eventNameInput.value, eventDateInput.value, eventLocationInput.value)).then(() => {
            HTMLFactory.clearContainer(eventSection);
            eventsData.getEvents(userID).then(response => eventHTML.listEventsToDom(response)).then(() => {
                return eventsData.getFriendEvents(userID)
            }).then(response => response.forEach(user => {
                return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
            }));
        })
    },
    // The submitEditEvent is meant to carry out the functionality of submitting the edited event to the database. It will collect the user input and build an event object with these values. Then it will PUT the object / replacing the correct object in the database.
    submitEditEvent: (id) => {
        const editName = document.querySelector("#editEvent-nameInput");
        const editDate = document.querySelector("#editEvent-dateInput");
        const editLocation = document.querySelector("#editEvent-locationInput");
        let userID = sessionStorage.getItem("userID");
        eventsData.putEvent(id, eventObjectBuilder(Number(userID), editName.value, editDate.value, editLocation.value)).then(() => HTMLFactory.clearContainer(eventSection)).then(() => eventsData.getEvents(userID)).then(response => eventHTML.listEventsToDom(response)).then(() => {
            return eventsData.getFriendEvents(userID)
        }).then(response => response.forEach(user => {
            return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
        }));
    },
    // The deleteEvent is meant to carry out the functionality of deleting the item targeted from the database, then it will make another fetch call and display the updated list of events to the DOM
    deleteEvent: () => {
        let eventID = event.target.id.split("--")[1];
        let userID = sessionStorage.getItem("userID");
        eventsData.deleteEvent(eventID).then(() => HTMLFactory.clearContainer(eventSection)).then(() => eventsData.getEvents(userID)).then(response => eventHTML.listEventsToDom(response)).then(() => {
            return eventsData.getFriendEvents(userID)
        }).then(response => response.forEach(user => {
            return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
        }));
    }
}

export default handlersForEvents;