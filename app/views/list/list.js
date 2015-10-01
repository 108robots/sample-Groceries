var applicationModule = require("application");
var dialogsModule = require("ui/dialogs");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");

var socialShare = require("nativescript-social-share");
var swipeDelete = require("../../shared/utils/ios-swipe-delete");
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");

var page;
var firstTime = true;
var groceryList = new GroceryListViewModel([]);
var history = groceryList.history();
var pageData = new observableModule.Observable({
	grocery: "",
	groceryList: groceryList,
	history: history
});

exports.loaded = function(args) {
	page = args.object;
	page.bindingContext = pageData;

	if (page.ios) {
		// Hide the Back arrow
		var controller = frameModule.topmost().ios.controller;
		controller.visibleViewController.navigationItem.setHidesBackButtonAnimated(true, false);

		var listView = page.getViewById("groceryList");
		swipeDelete.enable(listView, function(index) {
			performDelete(index);
		});

		// Add a listeners
		if (firstTime) {
			applicationModule.ios.addNotificationObserver("UITextFieldTextDidEndEditingNotification", add);
		}
	}

	groceryList.empty();

	showPageLoadingIndicator();
	groceryList.load().then(function() {
		hidePageLoadingIndicator();

		// Fade in the ListView over 1 second
		page.getViewById("groceryList").animate({
			opacity: 1,
			duration: 1000
		});
	});

	firstTime = false;
};

function add() {
	// Check for empty submission
	if (pageData.get("grocery").trim() !== "") {
		showPageLoadingIndicator();
		page.getViewById("grocery").dismissSoftInput();
		groceryList.add(pageData.get("grocery"))
			.catch(function(error) {
				console.log(error);
				dialogsModule.alert({
					message: "An error occurred while adding an item to your list.",
					okButtonText: "OK"
				});
			})
			.then(hidePageLoadingIndicator);

		// Clear the textfield
		pageData.set("grocery", "");
	} else {
		dialogsModule.alert({
			message: "Enter a grocery item",
			okButtonText: "OK"
		});
	}
};

exports.signOut = function() {
	frameModule.topmost().goBack();
};

exports.history = function() {
	page.getViewById("drawer").toggleDrawerState();
};

exports.toggleHistory = function(args) {
	var item = args.view.bindingContext;
	groceryList.toggleDoneHistory(history.indexOf(item));
};

exports.addFromHistory = function(args) {
	groceryList.restore();
	return;

	pageData.set("isHistoryLoading", true);
	groceryList.restore()
		.catch(handleAddError)
		.then(function() {
			pageData.set("isHistoryLoading", false);
		});
};

exports.share = function() {
	var list = [];
	for (var i = 0, size = groceryList.length; i < size ; i++) {
		list.push(groceryList.getItem(i).name);
	}
	var listString = list.join(", ").trim();
	socialShare.shareText(listString);
};

function handleAddError(error) {
	console.log(error);
	dialogsModule.alert({
		message: "An error occurred while adding an item to your list.",
		okButtonText: "OK"
	});
}

function performDelete(index) {
	showPageLoadingIndicator();
	groceryList.delete(index)
		.catch(handleAddError)
		.then(hidePageLoadingIndicator);
}

function showPageLoadingIndicator() {
	pageData.set("isLoading", true);
}
function hidePageLoadingIndicator() {
	pageData.set("isLoading", false);
}

exports.delete = function(args) {
	var item = args.view.bindingContext;
	performDelete(groceryList.indexOf(item));
};

exports.toggleDone = function(args) {
	var item = args.view.bindingContext;
	showPageLoadingIndicator();
	groceryList.toggleDone(groceryList.indexOf(item))
		.catch(handleAddError)
		.then(hidePageLoadingIndicator);
};
