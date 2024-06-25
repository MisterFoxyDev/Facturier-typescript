import { HasSetItem } from "../interfaces/HasSetItem.js";

export class Storage implements HasSetItem {
  oldData: string[] = [];

  constructor(docType: string, htmlString: string) {
    this.setItem(docType, htmlString);
  }
  static checkLocalStorage(): void {
    if (localStorage.getItem("invoice") === null) {
      localStorage.setItem("invoice", "[]");
    }

    if (localStorage.getItem("estimate") === null) {
      localStorage.setItem("estimate", "[]");
    }
  }
  setItem(docType: string, htmlString: string): void {
    let array: string | null = localStorage.getItem(docType);
    if (array !== null) {
      this.oldData = JSON.parse(array);
      this.oldData.push(htmlString);
      localStorage.setItem(docType, JSON.stringify(this.oldData));
    } else {
      document.location.reload();
    }
  }
}
