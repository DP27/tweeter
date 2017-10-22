/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  
  function calculateSince(timeCreated){//For timestamp converting milliseconds into years/months/days/hours/min/sec.
    var created = new Date(timeCreated);
    var seconds = Math.floor((Date.now() - created) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + ' years';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + ' months';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + ' days';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + ' hours';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + ' minutes';
    }

    return Math.floor(seconds) + ' seconds';
}
  


  function escape(str) {//For preventing javascripts from running in the textarea and converting them to text.
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }




function createTweetElement(tweet){//Creating tweets using the array retrieved from database.
    var date = calculateSince(tweet['created_at']);
    var html= `
    <section id="tweets">
        <article class="oTweet">
            <header>
                <img src=${(tweet['user']['avatars']['small'])}>
                <span class="tweeterName">${tweet['user']['name']}</span>
                <span class="tweeterId">${tweet['user']['handle']}</span>
            </header>
            <article>
              <p wrap="hard"> ${escape(tweet['content']['text'])}</p>
            </article>
            <footer>
                <span class="postTime">${date}</span>
                <div class="icon">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                </div>
            </footer>
        </article>
    </section>
    `;
    return html;
};



  

function renderTweets(tweetsArray){//for rendering tweets
  $("#empty").empty();
  tweetsArray.forEach(function(tweet){
    let retVal = createTweetElement(tweet);
    $('#empty').prepend(retVal);
  });
};


function loadTweets(){//Loading tweets
  $.ajax({
    type: 'GET',
    url: "http://localhost:8080/tweets",
    success: function(result){
      renderTweets(result);
    }
  });
};



$(document).ready(function(){//Waiting for DOM to load the html elements
  var retCount = 0;
  $('textarea').keyup(function() {//Monitoring user input into textarea for whitespaces.
    var input = $(this).val().replace(/\s/g, '');
    if(input.length > 0){
      retCount = $(this).val().length;  
    }else{
      retCount = 0;
    }
  });



  $(document).find('.new-tweet').find('textarea').focus();
  loadTweets();
  $( "form" ).on('submit',function(event){//Posting tweets
    event.preventDefault();
    var text= $(this).serialize(); 
    if((retCount === 0)){
      alert("No data in the form field");
    }else if(retCount > 140){
      alert("Exceeded Character Limit");
    }else{
      $.ajax({
        type: 'POST',
        url: "http://localhost:8080/tweets",
        data: text,
        success: function(result){
          loadTweets();
        }
      }); 
      $(this).trigger("reset");//reseting textarea
      $(this).find('span').text('140');//reseting char count
      $(document).find('.new-tweet').find('textarea').focus();
    }
  });
  return;
});



$(document).ready(function composeTweet(){//Sliding the compose tweet form up and down when compose button is pressed
  $('.compose-button').on('click',function(){
    window.scrollTo(0, 0);
    var elem = $(document).find('.new-tweet');
    if((elem).is(':visible')){
      (elem).slideUp();
    }else{
      (elem).slideDown();
      (elem).find('textarea').focus();
    }  
  });  
});
  




