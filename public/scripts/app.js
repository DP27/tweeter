/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*function prettyDate(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getUTCMonth()] + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
  }*/

  function calculateSince(datetime)
  {
    var tTime=new Date(datetime);
    var cTime=new Date();
    var sinceMin=Math.round((cTime-tTime)/60000);
    if(sinceMin==0)
    {
        var sinceSec=Math.round((cTime-tTime)/1000);
        if(sinceSec<10)
          var since='less than 10 seconds ago';
        else if(sinceSec<20)
          var since='less than 20 seconds ago';
        else
          var since='half a minute ago';
    }
    else if(sinceMin==1)
    {
        var sinceSec=Math.round((cTime-tTime)/1000);
        if(sinceSec==30)
          var since='half a minute ago';
        else if(sinceSec<60)
          var since='less than a minute ago';
        else
          var since='1 minute ago';
    }
    else if(sinceMin<45)
        var since=sinceMin+' minutes ago';
    else if(sinceMin>44&&sinceMin<60)
        var since='about 1 hour ago';
    else if(sinceMin<1440){
        var sinceHr=Math.round(sinceMin/60);
    if(sinceHr==1)
      var since='about 1 hour ago';
    else
      var since='about '+sinceHr+' hours ago';
    }
    else if(sinceMin>1439&&sinceMin<2880)
        var since='1 day ago';
    else
    {
        var sinceDay=Math.round(sinceMin/1440);
        var since=sinceDay+' days ago';
    }
    return since;
  };




  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

function createTweetElement(tweet){
    var date = calculateSince(tweet['created_at']);
    var html= `
    <section id="tweets">
        <article class="oldTweet">
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



  

function renderTweets(tweetsArray){
    tweetsArray.forEach(function(tweet){
        let retVal = createTweetElement(tweet);
        $('#empty').prepend(retVal);
    });
};


$(document).ready(function(){
  $(document).find('.new-tweet').find('textarea').focus();
  loadTweets();
  $( "form" ).on('submit',function( event ) {
    event.preventDefault();
    var text= $(this).serialize();
    //let monitor = text.split('');
    if((text.length-5 == 0) || (text=='text=%0D%0A')){
      alert("No data in the form field");
    }else if(text.length-5 >= 140){
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
    
    $(this).trigger("reset");
    $(this).find('span').text('140');
    $(document).find('.new-tweet').find('textarea').focus();
    
    }
  })
  return;
});

$(document).ready(function composeTweet(){
  $('.compose-button').on('click',function(){

   var elem = $(document).find('.new-tweet');
    if((elem).is(':visible')){
      
      (elem).slideUp();
    }else{
      (elem).slideDown();
      (elem).find('textarea').focus();
    }  
  })  
  });
  


  function loadTweets(){
    $.ajax({
      type: 'GET',
      url: "http://localhost:8080/tweets",
      success: function(result){
      renderTweets(result);
      console.log("success fetched tweets array");
      
      }
    });
  }
