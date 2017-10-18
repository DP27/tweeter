/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function prettyDate(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
  }


  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

function createTweetElement(tweet){
    var date = prettyDate(new Date(tweet['created_at']));
    var html= `
    <section id="tweets">
        <article class="oldTweet">
            <header>
                <img src=${(tweet['user']['avatars']['small'])}>
                <span class="tweeterName">${tweet['user']['name']}</span>
                <span class="tweeterId">${tweet['user']['handle']}</span>
            </header>
            <article>
              <p> ${escape(tweet['content']['text'])}</p>
            </article>
            <footer>
                <span class="postTime">${date}</span>
                <div class="icon">
                    <i class="first first-flag" aria-hidden="true"></i>
                    <i class="first second-flag" aria-hidden="true"></i>
                    <i class="first third-flag" aria-hidden="true"></i>
                </div>
            </footer>
        </article>
    </section>
    `;
    return html;
};


var tweetsArray = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "<script>alert('uh oh!');</script>"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];
  

function renderTweets(tweetsArray){
    tweetsArray.forEach(function(tweet){
        let retVal = createTweetElement(tweet);
        $('.container').append(retVal);
    });
};

$(document).ready(function(){
    renderTweets(tweetsArray);
})