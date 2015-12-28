import {nativeScriptBootstrap} from "nativescript-angular/application";
import {Component} from "angular2/core";
import * as frameModule from "ui/frame";
import * as observableModule from "data/observable";

@Component({
    selector: "login",
    templateUrl: "views/tempLogin/login.html"
})
class LoginPage {
    //...
}

export function loaded(args: observableModule.EventData) {
    let page = args.object;
    nativeScriptBootstrap(LoginPage, []);
}
