import HTMLFactory from "../HTMLFactory";
import eventsData from "./eventsDataManager";
import eventHTML from "./eventHTML"
import handlersForEvents from "./handlersForEvents";

// Author: Chris Morgan

// The createEventForm is meant to create the form that the user will need to create a new event.


const createEventForm = {
    eventFormBuilder: () => {
        let userID = sessionStorage.getItem("userID");
        const eventSection = document.querySelector("#events-section");
        const newEventCard = HTMLFactory.createElementWithText("div", undefined, "createEvent-card");
        newEventCard.classList.add("card");
        const newEventHeader = newEventCard.appendChild(HTMLFactory.createElementWithText("h3", "Enter New Event Information", "createEvent-header"));
        newEventHeader.classList.add("card-header");
        const newEventForm = newEventCard.appendChild(HTMLFactory.createElementWithText("form", undefined, "createEvent-form"));
        const newNameDiv = newEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        newNameDiv.classList.add("form-group");
        const newEventNameLabel = newNameDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Name:"));
        const newEventNameInput = newNameDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "createEvent-nameInput"));
        newEventNameInput.classList.add("form-control");
        const newDateDiv = newEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        newDateDiv.classList.add("form-group");
        const newEventDateLabel = newDateDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Date:"));
        const newEventDateInput = newDateDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "createEvent-dateInput"));
        newEventDateInput.classList.add("form-control");
        newEventDateInput.setAttribute("type", "date");
        const newLocationDiv = newEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        newLocationDiv.classList.add("form-group");
        const newEventLocationLabel = newLocationDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Location:"));
        const newEventLocationInput = newLocationDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "createEvent-locationInput"));
        newEventLocationInput.classList.add("form-control");
        const newEventButtons = newEventForm.appendChild(HTMLFactory.createElementWithText("div", undefined, "createEvent-buttonGroup"))
        newEventButtons.classList.add("btn-group");
        const submitEventButton = newEventButtons.appendChild(HTMLFactory.createElementWithText("button", "Submit", "createEvent-submitButton"));
        submitEventButton.classList.add("btn");
        submitEventButton.classList.add("btn-sm");
        submitEventButton.classList.add("btn-info");
        submitEventButton.type ="button";
        submitEventButton.addEventListener("click", handlersForEvents.submitNewEventHandler);
        const cancelEventButton = newEventButtons.appendChild(HTMLFactory.createElementWithText("button", "Cancel", "createEvent-cancelButton"));
        cancelEventButton.classList.add("btn");
        cancelEventButton.classList.add("btn-sm");
        cancelEventButton.classList.add("btn-danger");
        cancelEventButton.type = "button";
        cancelEventButton.addEventListener("click", function(){
            HTMLFactory.clearContainer(eventSection);
            eventsData.getEvents(userID).then(response => eventHTML.listEventsToDom(response)).then(() => {
                return eventsData.getFriendEvents(userID)
            }).then(response => response.forEach(user => {
                return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
            }));
        })

        return newEventCard;
    }
}

export default createEventForm;