"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  const hostName = story.getHostName();
  
  let starType = changeStarType(story);

  return $(`
      <li id="${story.storyId}">
        <a class="favorited-star" >
          <i class="${starType} fa-star" ></i>
        </a> 
        <a class="story-link" href="${story.url}" target="a_blank">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Replace starType based on whether the story ID is found in the user's favorites */
function changeStarType(story){
  const favoriteStoriesList = currentUser.favorites;
  //check if one of the fav stories === story.storyId
  if (favoriteStoriesList.some(favoriteStory => favoriteStory.storyId === story.storyId)){
    return "fas";
  }else {
    return "far";
  }
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  // empty out that part of the page
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const markup = generateStoryMarkup(story);
    $allStoriesList.append(markup);
  }
  $allStoriesList.show();
}

/*
  Handles a new story submission. Creates a new story object with the input values and adding it
  to the story list. 
*/
async function handleNewStorySubmit(event) {
  console.debug("handleNewStorySubmit", event);
  event.preventDefault();
  const author = $("#new-story-author").val();
  const title = $("#new-story-title").val();
  const url = $("#new-story-url").val();

  let newStory = {author, title, url};
  newStory = new Story(newStory);
  // adds the newStory to the storyList.
  await storyList.addStory(currentUser, newStory);
  // Updates the stories on page without refreshing.
  putStoriesOnPage();
  $newStoryForm.hide();
  $newStoryForm.trigger("reset");
}

$newStoryForm.on("submit", handleNewStorySubmit);


/**Get user's favorite story from server, and update HTML */
function putFavoriteStoryOnPage(){
  console.debug("putFavoriteStoryOnPage", putFavoriteStoryOnPage);

  $favoritedStoriesList.empty();
  
  const userFavoritedStories = currentUser.favorites;
  
  userFavoritedStories.forEach(favoriteStory => {
    const markup = generateStoryMarkup(favoriteStory);
    $favoritedStoriesList.append(markup);
  });
  $favoritedStoriesList.show();
}


/** Get clicked favorited stories, and remove or add accordingly to the user's 
 * favoriteStories list
 */
async function toggleFavoriteStory(event){
  // For each starred story, get the storyid of the <li> closest the star.
  // Find closest i element, add story to user's favorites story list;
  // If hollow star is clicked, change class, add story to user's fav story list
  //  and vice versas to remove favorited story

  const $closestListItem = $(event.target).closest("li");
  const $liStoryId =  $closestListItem.attr("id");
  const storyObj = storyList.stories.find(story => story.storyId === $liStoryId);
  const $starFavorite = $(event.target).closest("i");

  console.log('toogleFavoriteStory storyobj', storyObj);
  if ($starFavorite.hasClass("far")){
    $starFavorite.removeClass("far");
    $starFavorite.addClass("fas"); 
    await currentUser.addFavoriteStory(storyObj);
    putFavoriteStoryOnPage();
  }else{
    $starFavorite.removeClass("fas");
    $starFavorite.addClass("far");
    await currentUser.removeFavoriteStory(storyObj);
    putFavoriteStoryOnPage();
  }
}

$allStoriesList.on("click", ".favorited-star", toggleFavoriteStory);
$favoritedStoriesList.on("click", ".favorited-star", toggleFavoriteStory);


// tasks: 
// DONE make checkbox (star shape for favorite stories) 
// DONE as a list item is made, we still attach star in html (generate story markup())
// DONE create a favorite tab left nav bar

// once they star a story, 
// add that to the favorites tab, show favorite stories in favorite tab
// unstar in remove from favorite list

// Add api call to favorite...method tells the server this is favorite

// addEventLister to toggle click to remove stories, remove obj from array
// $favoriteStories = $("#favorite-stories");