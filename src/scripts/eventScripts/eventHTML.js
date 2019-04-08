import HTMLFactory from "../HTMLFactory"
import handlersForEvents from "./handlersForEvents"
import editEventForm from "./editEventForm"

const eventHTML = {
    // buildEventCard builds the outer structure of the card.
    buildEventCard: () => {
        const eventCard = HTMLFactory.createElementWithText("div", undefined, "eventCard-card");
        eventCard.classList.add("card");
        eventCard.classList.add("bg-light")
        eventCard.classList.add("text-dark");
        const cardHeader = eventCard.appendChild(HTMLFactory.createElementWithText("h3", "Events", "eventCard-header"))
        cardHeader.classList.add("card-header")
        const cardBody = eventCard.appendChild(HTMLFactory.createElementWithText("div", undefined, "eventCard-body"));
        cardBody.classList.add("card-body");
        // cardBody.classList.add("bg-light");
        return eventCard;
    },
    // htmlforEachEvent takes the event object and creates the html structure for it
    HTMLforEachEvent: (eventObj) => {
        const eventSection = document.querySelector("#events-section");
        const cardBody = document.querySelector("#eventCard-body");
        const userID = sessionStorage.getItem("userID");
        const eachEventContainer = cardBody.appendChild(HTMLFactory.createElementWithText("div", undefined, `event--${eventObj.id}`));
        
        const eventName = eachEventContainer.appendChild(HTMLFactory.createElementWithText("h3", eventObj.eventName, `eventCard-name--${eventObj.id}`));
        eventName.classList.add("card-text");
        const eventDate = eachEventContainer.appendChild(HTMLFactory.createElementWithText("p", eventObj.eventDate, `eventCard-date--${eventObj.id}`));
        eventDate.classList.add("card-text");
        const eventLocation = eachEventContainer.appendChild(HTMLFactory.createElementWithText("p", eventObj.eventLocation, `eventCard-location--${eventObj.id}`));
        eventLocation.classList.add("card-text");
        if(eventObj.userId === Number(userID)){
            eachEventContainer.classList.add("myEvent");
            const eventButtonGroup = eachEventContainer.appendChild(HTMLFactory.createElementWithText("div", undefined, `eventCard-buttonGroup--${eventObj.id}`));
            eventButtonGroup.classList.add("btn-group");
            eventButtonGroup.classList.add("mb-3");
            const eventEditButton = eventButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Edit Event", `eventCard-editButton--${eventObj.id}`));
            eventEditButton.classList.add("btn");
            eventEditButton.classList.add("btn-sm");
            eventEditButton.classList.add("btn-info");
            eventEditButton.addEventListener("click", function(){
            const nameToCopy = event.target.parentNode.parentNode.firstChild;
            const dateToCopy = nameToCopy.nextSibling;
            const locationToCopy = dateToCopy.nextSibling;
            let id = Number(event.target.id.split("--")[1])
            HTMLFactory.clearContainer(eventSection);
            eventSection.appendChild(editEventForm.editEventFormBuilder(nameToCopy.textContent, dateToCopy.textContent, locationToCopy.textContent, id));
        });
        const eventDeleteButton = eventButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Delete Event", `eventCard-deleteButton--${eventObj.id}`));
        eventDeleteButton.classList.add("btn");
        eventDeleteButton.classList.add("btn-sm");
        eventDeleteButton.classList.add("btn-danger");
        eventDeleteButton.addEventListener("click", handlersForEvents.deleteEvent);
        } else if (eventObj.userId !== Number(userID)) {
            eachEventContainer.classList.add("friendEvent");
            cardBody.classList.add("card-body");
            eventName.setAttribute("style", "font-style: italic");
            eventDate.setAttribute("style", "font-style: italic");
            eventLocation.setAttribute("style", "font-style: italic");
        }
    },
    // listEventsToDom takes the array of events and calls the htmlForEachEvent function for each event, and appends each one to the DOM.
    listEventsToDom: (eventsArray) => {
        const eventSection = document.querySelector("#events-section");
        if(!eventSection.firstChild){
            eventSection.appendChild(eventHTML.buildEventCard());
            eventsArray.forEach(event => {
            eventHTML.HTMLforEachEvent(event);
            })
            let eventCard = document.querySelector("#eventCard-card");
            const cardFooter = eventCard.appendChild(HTMLFactory.createElementWithText("div", undefined, "eventCard-footer"));
            cardFooter.classList.add("card-footer");
            const newEventButton = cardFooter.appendChild(HTMLFactory.createElementWithText("button", "Create New Event", "eventCard-createButton"));
            newEventButton.classList.add("btn");
            newEventButton.classList.add("btn-block");
            newEventButton.classList.add("btn-primary");
            newEventButton.addEventListener("click", handlersForEvents.createNewEventHandler);
            return eventCard;
        } else {
            let eventCardBody = document.querySelector("#eventCard-body");
            eventsArray.forEach(event => {
                eventHTML.HTMLforEachEvent(event);
            })
            return eventCardBody;
        }
    }
}


export default eventHTML;