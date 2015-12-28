var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var config = require("../../shared/config");
var fetchModule = require("fetch");
var observableModule = require("data/observable");
var validator = require("email-validator");
var UserViewModel = (function (_super) {
    __extends(UserViewModel, _super);
    function UserViewModel(info) {
        _super.call(this);
        this.email = info.email || "";
        this.password = info.password || "";
    }
    UserViewModel.prototype.login = function () {
        return fetchModule.fetch(config.apiUrl + "oauth/token", {
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
            .then(function (response) {
            return response.json();
        })
            .then(function (data) {
            config.token = data.Result.access_token;
        });
    };
    UserViewModel.prototype.register = function () {
        return fetchModule.fetch(config.apiUrl + "Users", {
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
    };
    UserViewModel.prototype.isValidEmail = function () {
        return validator.validate(this.get("email"));
    };
    ;
    return UserViewModel;
})(observableModule.Observable);
exports.UserViewModel = UserViewModel;
function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbIlVzZXJWaWV3TW9kZWwiLCJVc2VyVmlld01vZGVsLmNvbnN0cnVjdG9yIiwiVXNlclZpZXdNb2RlbC5sb2dpbiIsIlVzZXJWaWV3TW9kZWwucmVnaXN0ZXIiLCJVc2VyVmlld01vZGVsLmlzVmFsaWRFbWFpbCIsImhhbmRsZUVycm9ycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFZLE1BQU0sV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBQzlDLElBQVksV0FBVyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQ3JDLElBQVksZ0JBQWdCLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLFNBQVMsV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRTdDO0lBQW1DQSxpQ0FBMkJBO0lBSTFEQSx1QkFBWUEsSUFBSUE7UUFDWkMsaUJBQU9BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLElBQUlBLEVBQUVBLENBQUNBO1FBQzlCQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxJQUFJQSxFQUFFQSxDQUFDQTtJQUN4Q0EsQ0FBQ0E7SUFFREQsNkJBQUtBLEdBQUxBO1FBQ0lFLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLGFBQWFBLEVBQUVBO1lBQ3BEQSxNQUFNQSxFQUFFQSxNQUFNQTtZQUNkQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDakJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBO2dCQUMzQkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsQ0FBQ0E7Z0JBQzlCQSxVQUFVQSxFQUFFQSxVQUFVQTthQUN6QkEsQ0FBQ0E7WUFDRkEsT0FBT0EsRUFBRUE7Z0JBQ0xBLGNBQWNBLEVBQUVBLGtCQUFrQkE7YUFDckNBO1NBQ0pBLENBQUNBO2FBQ0RBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO2FBQ2xCQSxJQUFJQSxDQUFDQSxVQUFTQSxRQUFRQTtZQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQ0E7YUFDREEsSUFBSUEsQ0FBQ0EsVUFBU0EsSUFBSUE7WUFDZixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQzVDLENBQUMsQ0FBQ0EsQ0FBQ0E7SUFDUEEsQ0FBQ0E7SUFFREYsZ0NBQVFBLEdBQVJBO1FBQ0lHLE1BQU1BLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLE9BQU9BLEVBQUVBO1lBQzlDQSxNQUFNQSxFQUFFQSxNQUFNQTtZQUNkQSxJQUFJQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtnQkFDakJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLE9BQU9BLENBQUNBO2dCQUMzQkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0E7Z0JBQ3hCQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxVQUFVQSxDQUFDQTthQUNqQ0EsQ0FBQ0E7WUFDRkEsT0FBT0EsRUFBRUE7Z0JBQ0xBLGNBQWNBLEVBQUVBLGtCQUFrQkE7YUFDckNBO1NBQ0pBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO0lBQzFCQSxDQUFDQTtJQUVESCxvQ0FBWUEsR0FBWkE7UUFDSUksTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDakRBLENBQUNBOztJQUNMSixvQkFBQ0E7QUFBREEsQ0FBQ0EsQUFqREQsRUFBbUMsZ0JBQWdCLENBQUMsVUFBVSxFQWlEN0Q7QUFqRFkscUJBQWEsZ0JBaUR6QixDQUFBO0FBRUQsc0JBQXNCLFFBQVE7SUFDMUJLLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQ2ZBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO1FBQ3RDQSxNQUFNQSxLQUFLQSxDQUFDQSxRQUFRQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtJQUNyQ0EsQ0FBQ0E7SUFDREEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7QUFDcEJBLENBQUNBIn0=