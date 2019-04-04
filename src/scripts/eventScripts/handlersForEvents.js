import HTMLFactory from "../HTMLFactory";
import createEventForm from "./createEventForm";

const handlersForEvents = {
    createNewEventHandler: () => {
        const eventSection = document.querySelector("#events-section");
        HTMLFactory.clearContainer(eventSection);
        eventSection.appendChild(createEventForm.eventFormBuilder());
    }
}

export default handlersForEvents;