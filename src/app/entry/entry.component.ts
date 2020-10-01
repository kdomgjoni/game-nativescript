import { Component, OnInit } from "@angular/core";
import { GameService } from "../service/game.service";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "entry",
    templateUrl: "./entry.component.html"
})
export class EntryComponent implements OnInit {

    entryValue;

    constructor(private gameService: GameService, private routerExtensions: RouterExtensions) {

    }

    ngOnInit() {}

    play(){
        this.gameService.serviceValue = this.entryValue;
        this.routerExtensions.navigate(["../home"])
    }

    dialog() {
        dialogs.alert({
            title: "GAME RULES",
            message: "If you hit number one, your turn is over. DEFAULT VALUE IS 50",
            okButtonText: "OK"
        }).then(function () {
            console.log("Dialog closed!");
        });
    }


}

