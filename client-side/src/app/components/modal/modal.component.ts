import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() modalMessage: string;
  @Input() headingMessage: string;

  constructor(public redux: NgRedux<AppState>) { }
  ngOnInit() {
    this.redux.getState().modal;
  }

  public closeModal() {
    this.redux.getState().modal = "none";
    this.redux.getState().closedModal = true;

  }

}


