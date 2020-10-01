import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { isAndroid, Page } from "tns-core-modules/ui/page";

@Component({
    selector: "modal",
    templateUrl: "./modal.component.html"
})
export class ModalComponent implements OnInit {

    winner;
    constructor( private params: ModalDialogParams) {
        this.winner = this.params.context + 1;
    }


    ngOnInit() {}

    close() {
        this.params.closeCallback();
    }

    onLoaded(e: any): void {
        if (isAndroid) {
            e.object._dialogFragment.getDialog().setCanceledOnTouchOutside(false);
        }
    }
}

