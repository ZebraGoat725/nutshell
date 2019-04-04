import HTMLFactory from "../HTMLFactory";
import eventHTML from "./eventHTML"
import API from "../apiManager"
import handlersForEvents from "./handlersForEvents";


// The editEventFormBuilder is meant to carry out the production of the edit form that appears when the edit event button is clicked. This has name, date, location, and id passed in as arguments in order to populate the edit form with the event information. The id is passed in to carry over to the submitEditEvent function, which needs a specific ID in order to select the right item in the database.
const editEventForm = {
    editEventFormBuilder: (name, date, location, id) => {
        let userID = sessionStorage.getItem("userID");
        const eventSection = document.querySelector("#events-section");
        const editEventCard = HTMLFactory.createElementWithText("div", undefined, "editEvent-card");
        const editEventHeader = editEventCard.appendChild(HTMLFactory.createElementWithText("h3", "Edit Event Information", "editEvent-header"));
        const editEventForm = editEventCard.appendChild(HTMLFactory.createElementWithText("form", undefined, "editEvent-form"));
        const editNameDiv = editEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        const editEventNameLabel = editNameDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Name:"));
        const editEventNameInput = editNameDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "editEvent-nameInput"));
        editEventNameInput.value = name;
        const editDateDiv = editEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        const editEventDateLabel = editDateDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Date:"));
        const editEventDateInput = editDateDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "editEvent-dateInput"));
        editEventDateInput.value = date;
        const editLocationDiv = editEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        const editEventLocationLabel = editLocationDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Location:"));
        const editEventLocationInput = editLocationDiv.appendChild(HTMLFactory.createElementWithText("input", location, "editEvent-locationInput"));
        editEventLocationInput.value = location;
        const submitEditButton = editEventForm.appendChild(HTMLFactory.createElementWithText("button", "Submit", "editForm-submitButton"));
        submitEditButton.type = "button";
        submitEditButton.addEventListener("click", function(){
            handlersForEvents.submitEditEvent(id);
        })
        const cancelEditButton = editEventForm.appendChild(HTMLFactory.createElementWithText("button", "Cancel", "editForm-cancelButton"));
        cancelEditButton.type = "button";
        cancelEditButton.addEventListener("click", function(){
            HTMLFactory.clearContainer(eventSection);
            API.getEvents(userID).then(response => eventHTML.listEventsToDom(response));
        })
        return editEventCard;
    }
}

export default editEventForm;