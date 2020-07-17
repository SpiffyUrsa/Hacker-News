"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);


/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $("#add-story").show();
  $navFavoriteStories.show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// When the Submit link is clicked, shows the add new story submit form.
$("#add-story").on("click", function() {$newStoryForm.show();});


/** Show user's favorited stories list once Favorites tab is click. */
function navFavoriteClicked(evt){
  console.debug("navFavoriteClicked", evt);
  hidePageComponents();
  putFavoriteStoryOnPage();
}

$navFavoriteStories.on("click", navFavoriteClicked);