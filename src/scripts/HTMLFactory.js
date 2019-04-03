const HTMLFactory = {
    // Function to build and return an element taking in element, text, and id as arguments.
    createElementWithText(element, text, id) {
        const newElement = document.createElement(element);
        if (text) {
            newElement.textContent = text;
        }
        if (id) {
            newElement.id = id;
        }
        return newElement;
    },
    // Function to clear the contents of the element which is passed as an argument.
    clearContainer(elementToClear) {
        while (elementToClear.firstChild) {
            elementToClear.removeChild(elementToClear.firstChild);
            return elementToClear;
        }
    }
};

export default HTMLFactory