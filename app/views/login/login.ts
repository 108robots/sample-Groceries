import {nativeScriptBootstrap} from "nativescript-angular/application";
import {Component} from "angular2/core";
import {RouteConfig} from "angular2/router";
import * as dialogsModule from "ui/dialogs";
import * as frameModule from "ui/frame";
import * as observableModule from "data/observable";
import {UserViewModel} from "../../shared/view-models/user-view-model";

import {RegisterPage} from "../register/register";

@Component({
    selector: "login",
    templateUrl: "views/login/login.html"
})
@RouteConfig([
    { path: '/', component: LoginPage, as: "Login" },
    { path: '/register', component: RegisterPage, as: "Register" }
])
export class LoginPage {
    user: UserViewModel;

    constructor() {
        this.user = new UserViewModel({
            email: "nativescriptrocks@telerik.com",
            password: "password"
        });
    }
    signIn() {
        this.user.login()
            .catch(function(error) {
                dialogsModule.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
            })
            .then(function() {
                frameModule.topmost().navigate("views/list/list");
            });
    }
    register() {
        frameModule.topmost().navigate("views/register/register");
    }
}

export function loaded(args: observableModule.EventData) {
    let page = args.object;
    if (page.ios) {
        let navigationBar = frameModule.topmost().ios.controller.navigationBar;
        navigationBar.barStyle = UIBarStyle.UIBarStyleBlack;
    }
    nativeScriptBootstrap(LoginPage, []);
}
