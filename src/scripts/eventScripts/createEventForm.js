import HTMLFactory from "../HTMLFactory";
import API from "../apiManager";
import eventHTML from "./eventHTML"
import handlersForEvents from "./handlersForEvents";

const createEventForm = {
    eventFormBuilder: () => {
        let userID = sessionStorage.getItem("userID");
        const eventSection = document.querySelector("#events-section");
        const newEventCard = HTMLFactory.createElementWithText("div", undefined, "createEvent-card");
        const newEventHeader = newEventCard.appendChild(HTMLFactory.createElementWithText("h3", "Enter New Event Information", "createEvent-header"));
        const newEventForm = newEventCard.appendChild(HTMLFactory.createElementWithText("form", undefined, "createEvent-form"));
        const newNameDiv = newEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        const newEventNameLabel = newNameDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Name:"));
        const newEventNameInput = newNameDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "createEvent-nameInput"));
        const newDateDiv = newEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        const newEventDateLabel = newDateDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Date:"));
        const newEventDateInput = newDateDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "createEvent-dateInput"));
        const newLocationDiv = newEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        const newEventLocationLabel = newLocationDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Location:"));
        const newEventLocationInput = newLocationDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "createEvent-locationInput"));
        const newEventButtons = newEventForm.appendChild(HTMLFactory.createElementWithText("div", undefined, "createEvent-buttonGroup"))
        const submitEventButton = newEventButtons.appendChild(HTMLFactory.createElementWithText("button", "Submit", "createEvent-submitButton"));
        submitEventButton.type ="button";
        submitEventButton.addEventListener("click", handlersForEvents.submitNewEventHandler);
        const cancelEventButton = newEventButtons.appendChild(HTMLFactory.createElementWithText("button", "Cancel", "createEvent-cancelButton"));
        cancelEventButton.type = "button";
        cancelEventButton.addEventListener("click", function(){
            HTMLFactory.clearContainer(eventSection);
            API.getEvents(userID).then(response => eventHTML.listEventsToDom(response));
        })

        return newEventCard;
    }
}

export default createEventForm;