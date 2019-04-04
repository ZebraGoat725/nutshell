import HTMLFactory from "../HTMLFactory";

const createEventForm = {
    eventFormBuilder: () => {
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
        const cancelEventButton = newEventButtons.appendChild(HTMLFactory.createElementWithText("button", "Cancel", "createEvent-cancelButton"));
        cancelEventButton.type = "button";

        return newEventCard;
    }
}

export default createEventForm;