import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  @Input() type: string = "button";
  @Input() disabled: boolean = false;
  @Input() buttonStyle: string = 'primary';

  constructor() {}

  ngOnInit(): void {}
}
