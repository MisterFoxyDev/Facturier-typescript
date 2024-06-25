import { Storage } from "../classes/Storage.js";
export class Display {
    constructor(container, hiddenDiv, printButton) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.printButton = printButton;
        this.formContainer = document.getElementById("form-container");
    }
    render(docObj, docType) {
        const htmlString = docObj.htmlFormat();
        this.container.innerHTML = htmlString;
        new Storage(docType, htmlString);
        this.hiddenDiv.classList.remove("invisible");
        this.formContainer.innerHTML = "";
        this.printButton.innerText = `Imprimer ${docType === "estimate" ? "le devis" : "la facture"}`;
    }
}
