import HTMLFactory from "../HTMLFactory";
import eventHTML from "./eventHTML"
import eventsData from "./eventsDataManager"
import handlersForEvents from "./handlersForEvents";


// The editEventFormBuilder is meant to carry out the production of the edit form that appears when the edit event button is clicked. This has name, date, location, and id passed in as arguments in order to populate the edit form with the event information. The id is passed in to carry over to the submitEditEvent function, which needs a specific ID in order to select the right item in the database.
const editEventForm = {
    editEventFormBuilder: (name, date, location, id) => {
        let userID = sessionStorage.getItem("userID");
        const eventSection = document.querySelector("#events-section");
        const editEventCard = HTMLFactory.createElementWithText("div", undefined, "editEvent-card");
        editEventCard.classList.add("card");
        const editEventHeader = editEventCard.appendChild(HTMLFactory.createElementWithText("h3", "Edit Event Information", "editEvent-header"));
        editEventHeader.classList.add("card-header");
        const editEventForm = editEventCard.appendChild(HTMLFactory.createElementWithText("form", undefined, "editEvent-form"));
        const editNameDiv = editEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        editNameDiv.classList.add("form-group");
        const editEventNameLabel = editNameDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Name:"));
        const editEventNameInput = editNameDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "editEvent-nameInput"));
        editEventNameInput.classList.add("form-control");
        editEventNameInput.value = name;
        const editDateDiv = editEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        editDateDiv.classList.add("form-group");
        const editEventDateLabel = editDateDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Date:"));
        const editEventDateInput = editDateDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "editEvent-dateInput"));
        editEventDateInput.classList.add("form-control");
        editEventDateInput.value = date;
        const editLocationDiv = editEventForm.appendChild(HTMLFactory.createElementWithText("div"))
        editLocationDiv.classList.add("form-group");
        const editEventLocationLabel = editLocationDiv.appendChild(HTMLFactory.createElementWithText("label", "Event Location:"));
        const editEventLocationInput = editLocationDiv.appendChild(HTMLFactory.createElementWithText("input", location, "editEvent-locationInput"));
        editEventLocationInput.classList.add("form-control");
        editEventLocationInput.value = location;
        const buttonGroup = editEventForm.appendChild(HTMLFactory.createElementWithText("div", undefined, "editForm-buttonGroup"));
        buttonGroup.classList.add("btn-group");
        const submitEditButton = buttonGroup.appendChild(HTMLFactory.createElementWithText("button", "Submit", "editForm-submitButton"));
        submitEditButton.classList.add("btn");
        submitEditButton.classList.add("btn-info");
        submitEditButton.classList.add("btn-sm");
        submitEditButton.type = "button";
        submitEditButton.addEventListener("click", function(){
            handlersForEvents.submitEditEvent(id);
        })
        const cancelEditButton = buttonGroup.appendChild(HTMLFactory.createElementWithText("button", "Cancel", "editForm-cancelButton"));
        cancelEditButton.type = "button";
        cancelEditButton.classList.add("btn");
        cancelEditButton.classList.add("btn-danger");
        cancelEditButton.classList.add("btn-sm");
        cancelEditButton.addEventListener("click", function(){
            HTMLFactory.clearContainer(eventSection);
            eventsData.getEvents(userID).then(response => eventHTML.listEventsToDom(response));
        })
        return editEventCard;
    }
}

export default editEventForm;