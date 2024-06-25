import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
import { HasRender } from "../interfaces/HasRender.js";
import { Storage } from "../classes/Storage.js";

export class Display implements HasRender {
  formContainer: HTMLDivElement;

  constructor(
    private container: HTMLDivElement,
    private hiddenDiv: HTMLDivElement,
    private printButton: HTMLButtonElement
  ) {
    this.formContainer = document.getElementById(
      "form-container"
    ) as HTMLDivElement;
  }
  render(docObj: HasHtmlFormat, docType: string) {
    const htmlString: string = docObj.htmlFormat();
    this.container.innerHTML = htmlString;

    new Storage(docType, htmlString);

    this.hiddenDiv.classList.remove("invisible");
    this.formContainer.innerHTML = "";
    this.printButton.innerText = `Imprimer ${
      docType === "estimate" ? "le devis" : "la facture"
    }`;
  }
}
