//import * as config from "../../shared/config";
import * as observableModule from "data/observable";
//import * as validator from "email-validator";

//HACK: make the compiler happy (we don't have those modules)
var config: any = {};
var validator: any = {};

export class UserViewModel extends observableModule.Observable {
    email: string;
    password: string;

    constructor(info) {
        super();

        this.email = info.email || "";
        this.password = info.password || "";
    }

    login() {
        return fetch(config.apiUrl + "oauth/token", {
            method: "POST",
            body: JSON.stringify({
                username: this.get("email"),
                password: this.get("password"),
                grant_type: "password"
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            config.token = data.Result.access_token;
        });
    }

    register() {
        return fetch(config.apiUrl + "Users", {
            method: "POST",
            body: JSON.stringify({
                Username: this.get("email"),
                Email: this.get("email"),
                Password: this.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors);
    }

    isValidEmail() {
        return validator.validate(this.get("email"));
    };
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
