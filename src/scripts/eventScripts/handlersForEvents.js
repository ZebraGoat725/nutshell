import HTMLFactory from "../HTMLFactory";
import createEventForm from "./createEventForm";
import editEventForm from "./editEventForm";
import API from "../apiManager";
import eventHTML from "./eventHTML";

const eventSection = document.querySelector("#events-section");

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

const handlersForEvents = {
    createNewEventHandler: () => {
        HTMLFactory.clearContainer(eventSection);
        eventSection.appendChild(createEventForm.eventFormBuilder());
    },
    editEventHandler: () => {
        HTMLFactory.clearContainer(eventSection);
        eventSection.appendChild(editEventForm.editEventFormBuilder());
    },
    submitNewEventHandler: () => {
        let userID = sessionStorage.getItem("userID");
        const eventNameInput = document.querySelector("#createEvent-nameInput");
        const eventDateInput = document.querySelector("#createEvent-dateInput");
        const eventLocationInput = document.querySelector("#createEvent-locationInput");
        API.postEvent(eventObjectBuilder(Number(userID), eventNameInput.value, eventDateInput.value, eventLocationInput.value)).then(() => {
            HTMLFactory.clearContainer(eventSection);
            API.getEvents(userID).then(response => eventHTML.listEventsToDom(response));
        })
    },
    submitEditEvent: (id) => {
        const editName = document.querySelector("#editEvent-nameInput");
        const editDate = document.querySelector("#editEvent-dateInput");
        const editLocation = document.querySelector("#editEvent-locationInput");
        let userID = sessionStorage.getItem("userID");
        API.putEvent(id, eventObjectBuilder(Number(userID), editName.value, editDate.value, editLocation.value)).then(() => HTMLFactory.clearContainer(eventSection)).then(() => API.getEvents(userID)).then(response => eventHTML.listEventsToDom(response));
    },
    deleteEvent: () => {
        let eventID = event.target.id.split("--")[1];
        let userID = sessionStorage.getItem("userID");
        API.deleteEvent(eventID).then(() => HTMLFactory.clearContainer(eventSection)).then(() => API.getEvents(userID)).then(response => eventHTML.listEventsToDom(response));
    }
}

export default handlersForEvents;