import { HasPrint } from "../interfaces/HasPrint.js";

export class Print implements HasPrint {
  constructor(private el: HTMLDivElement) {}
  print() {
    document.body.innerHTML = this.el.innerHTML;
    window.print();
    document.location.reload();
  }
}


type myType = string | number;

function (a: myType, b: myType): myType {
  if()
return a + b;
}