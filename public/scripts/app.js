/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //helper function: validate tweet submission
  function validateTweet (tweet){

    const limit = 140;
    const tlength = tweet.length;
    if(tlength > 140){
      alert("Tweet too long!");
      return false;
    } else if (tlength < 1){
      alert("No tweet found!");
      return false;
    } else {
      return true;
    }
  }

  //Accepts tweet object and returns a JQuery object of the tweet HTML model
  function createTweetElement (data){
    let tweetObj = `

        <article class="old-tweets">
          <header>
            <img src= ${data.user.avatars.small} />
            <span class="name">${data.user.name}</span>
            <span class="tag">${data.user.handle}</span>
          </header>
          <div class="twbody">${data.content.text}</div>
          <footer>
            <span>${moment(data.created_at).fromNow()}</span>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </footer>
        </article>
      `;
    return $(tweetObj);
  }

  //accepts an array of tweet objects and appends to the homepage.
  function renderTweets(tweets){
    $('.container .old').empty();

    for(var i = 0; i < tweets.length; i++){
      var $tweet = createTweetElement(tweets[i]);
      $('.container .old').prepend($tweet);
    }
  }

  //Setup for listening for tweet submission and entry to DB.
  var $submit = $('.new-tweet input');
  $submit.on('click', function () {
    event.preventDefault();
    var tweet =$(this).siblings("textarea")[0].value;


    if (validateTweet(tweet)){
      $.ajax('/tweets', { method: 'POST', data: $(this).siblings("textarea").serialize() })
      .then(function(item){
        console.log("Ajax Post");
        loadTweets();
      })
    }

  });


  //grabs tweets for tweets DB and renders to page.
  function loadTweets(){
    $.ajax('/tweets', { method: 'GET' })
    .then(function (moreTweets){
      //console.log('Success get: ', moreTweets);
      renderTweets(moreTweets);
    })
  }

  loadTweets();


});