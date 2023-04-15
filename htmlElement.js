export class ElementParams {
    constructor({ type, content = "", classes = "", contentType = "text", id = "" }) {
        this.type = type;
        this.content = content;
        this.classes = classes;
        this.contentType = contentType;
        this.id = id;
    }
}

export const getElement = (elementParams) => {
    let element = document.createElement(elementParams.type);

    if (elementParams.contentType == "text") {
        element.textContent = elementParams.content;
    } else if (elementParams.contentType == "html") {
        element.innerHTML = elementParams.content;
    }

    if (elementParams.classes.length != 0) {
        element.className = elementParams.classes
    }

    if (elementParams.id.toString().length != 0) {
        element.id = elementParams.id.toString()
    }
    return element;
}