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

  // render all the rest of the story markup
  return $(`
      <li id="${story.storyId}">
        <a class="story-link" href="${story.url}" target="a_blank">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
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