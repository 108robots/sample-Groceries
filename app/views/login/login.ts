import {Component} from "angular2/core";
import {Router} from "angular2/router";
import * as dialogsModule from "ui/dialogs";
import {TextField} from "ui/text-field";

import {UserViewModel} from "../../shared/view-models/user-view-model";
import {ActionBarUtil} from "../../shared/utils/action-bar-util";

@Component({
    selector: "login",
    templateUrl: "views/login/login.html"
})
export class LoginPage {
    user: UserViewModel;

    constructor(private router: Router) {
        // this.configureActionBar();
        this.user = new UserViewModel({
            email: "nativescriptrocks@telerik.com",
            password: "password"
        });
    }

    configureActionBar() {
        ActionBarUtil.customizeStatusBar();
        ActionBarUtil.setTitle("Sign In");
        ActionBarUtil.emptyActionBarItems();
    }

    signIn() {
        this.user.login()
            .then(() => {
                this.router.navigate(["List"]);
            })
            .catch((error) => {
                dialogsModule.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
            });
    }
    register() {
        this.router.navigate(["Register"]);
    }
}
