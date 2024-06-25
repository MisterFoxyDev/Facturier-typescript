import { Data } from "../classes/Data.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
export class FormInput {
    constructor() {
        this.form = document.getElementById("form");
        this.type = document.getElementById("type");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.address = document.getElementById("address");
        this.country = document.getElementById("country");
        this.town = document.getElementById("town");
        this.zip = document.getElementById("zip");
        this.product = document.getElementById("product");
        this.price = document.getElementById("price");
        this.quantity = document.getElementById("quantity");
        this.tva = document.getElementById("tva");
        this.docContainer = document.getElementById("document-container");
        this.hiddenDiv = document.getElementById("hiddenDiv");
        this.storedEl = document.getElementById("stored-data");
        this.printButton = document.getElementById("print");
        this.reloadButton = document.getElementById("reload");
        this.invoicesDisplayBtn = document.getElementById("stored-invoices");
        this.estimatesDisplayBtn = document.getElementById("stored-estimates");
        // Listeners Calls
        this.submitFormListener();
        this.printListener(this.printButton, this.docContainer);
        this.reloadListener(this.reloadButton);
        this.getStoredDocsListener();
    }
    // Listeners List
    submitFormListener() {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
    printListener(button, container) {
        button.addEventListener("click", () => {
            let availableDoc;
            availableDoc = new Print(container);
            availableDoc.print();
        });
    }
    reloadListener(button) {
        button.addEventListener("click", () => {
            document.location.reload();
            window.scrollTo(0, 0);
        });
    }
    getStoredDocsListener() {
        this.invoicesDisplayBtn.addEventListener("click", this.getItems.bind(this, "invoice"));
        this.estimatesDisplayBtn.addEventListener("click", this.getItems.bind(this, "estimate"));
    }
    getItems(docType) {
        if (this.storedEl.hasChildNodes()) {
            this.storedEl.innerHTML = "";
        }
        if (localStorage.getItem(docType)) {
            let array;
            array = localStorage.getItem(docType);
            if (array !== null && array.length > 2) {
                let arrayData;
                arrayData = JSON.parse(array);
                arrayData.map((doc) => {
                    let card = document.createElement("div");
                    let cardBody = document.createElement("div");
                    let cardClasses = ["card", "mt-5"];
                    let cardBodyClasses = "card-body";
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(...cardBodyClasses);
                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    this.storedEl.append(card);
                });
            }
            else {
                this.storedEl.innerHTML =
                    "<div class='p-5'>Aucun document disponible</div>";
            }
        }
        localStorage.getItem(docType);
    }
    // Handlers
    handleFormSubmit(e) {
        e.preventDefault();
        const inputs = this.inputData();
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva,] = inputs;
            let docData;
            let date = new Date();
            docData = new Data(...inputs, date);
            let template;
            template = new Display(this.docContainer, this.hiddenDiv, this.printButton);
            template.render(docData, type);
        }
    }
    inputData() {
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [
                type,
                firstName,
                lastName,
                address,
                country,
                town,
                zip,
                product,
                price,
                quantity,
                tva,
            ];
        }
        alert("Les valeurs numériques doivent être supérieures à 0 !");
        return;
    }
}
