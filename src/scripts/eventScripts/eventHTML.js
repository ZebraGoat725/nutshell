import HTMLFactory from "../HTMLFactory"
import handlersForEvents from "./handlersForEvents"
import editEventForm from "./editEventForm"

const eventHTML = {
    buildEventCard: () => {
        const eventCard = HTMLFactory.createElementWithText("div", undefined, "eventCard-card");
        const cardHeader = eventCard.appendChild(HTMLFactory.createElementWithText("h3", "Events", "eventCard-header"))

        return eventCard;
    },
    HTMLforEachEvent: (eventObj) => {
        const eventSection = document.querySelector("#events-section");
        const eventCard = document.querySelector("#eventCard-card");
        const cardBody = eventCard.appendChild(HTMLFactory.createElementWithText("div", undefined, `eventCard-body--${eventObj.id}`));
        const eventName = cardBody.appendChild(HTMLFactory.createElementWithText("p", eventObj.eventName, `eventCard-name--${eventObj.id}`));
        const eventDate = cardBody.appendChild(HTMLFactory.createElementWithText("p", eventObj.eventDate, `eventCard-date--${eventObj.id}`));
        const eventLocation = cardBody.appendChild(HTMLFactory.createElementWithText("p", eventObj.eventLocation, `eventCard-location--${eventObj.id}`));
        const eventButtonGroup = cardBody.appendChild(HTMLFactory.createElementWithText("div", undefined, `eventCard-buttonGroup--${eventObj.id}`));
        const eventEditButton = eventButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Edit Event", `eventCard-editButton--${eventObj.id}`));
        eventEditButton.addEventListener("click", function(){
            const nameToCopy = event.target.parentNode.parentNode.firstChild;
            const dateToCopy = nameToCopy.nextSibling;
            const locationToCopy = dateToCopy.nextSibling;
            ;
            let id = Number(event.target.id.split("--")[1])
            HTMLFactory.clearContainer(eventSection);
            eventSection.appendChild(editEventForm.editEventFormBuilder(nameToCopy.textContent, dateToCopy.textContent, locationToCopy.textContent, id));
        });
        const eventDeleteButton = eventButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Delete Event", `eventCard-deleteButton--${eventObj.id}`));
        eventDeleteButton.addEventListener("click", handlersForEvents.deleteEvent);
    },
    listEventsToDom: (eventsArray) => {
        const eventSection = document.querySelector("#events-section");
        eventSection.appendChild(eventHTML.buildEventCard());
        eventsArray.forEach(event => {
            eventHTML.HTMLforEachEvent(event);
        })
        const eventCard = document.querySelector("#eventCard-card");
        const cardFooter = eventCard.appendChild(HTMLFactory.createElementWithText("div", undefined, "eventCard-footer"));
        const newEventButton = cardFooter.appendChild(HTMLFactory.createElementWithText("button", "Create New Event", "eventCard-createButton"));
        newEventButton.addEventListener("click", handlersForEvents.createNewEventHandler);
        return eventCard;
    }
}

export default eventHTML;