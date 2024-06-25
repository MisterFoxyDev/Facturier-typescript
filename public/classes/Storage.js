export class Storage {
    constructor(docType, htmlString) {
        this.oldData = [];
        this.setItem(docType, htmlString);
    }
    static checkLocalStorage() {
        if (localStorage.getItem("invoice") === null) {
            localStorage.setItem("invoice", "[]");
        }
        if (localStorage.getItem("estimate") === null) {
            localStorage.setItem("estimate", "[]");
        }
    }
    setItem(docType, htmlString) {
        let array = localStorage.getItem(docType);
        if (array !== null) {
            this.oldData = JSON.parse(array);
            this.oldData.push(htmlString);
            localStorage.setItem(docType, JSON.stringify(this.oldData));
        }
        else {
            document.location.reload();
        }
    }
}
