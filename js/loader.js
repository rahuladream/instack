            (function($) {

            $.fn.scrollPagination = function(options) {
                
                var settings = { 
                    nop     : 2, // The number of posts per scroll to be loaded
                    offset  : 0, // Initial offset, begins at 0 in this case
                    error   : 'No More Posts!', // When the user reaches the end this is the message that is
                                                // displayed. You can change this if you want.
                    delay   : 500, // When you scroll down the posts will load after a delayed amount of time.
                                   // This is mainly for usability concerns. You can alter this as you see fit
                    scroll  : true, // The main bit, if set to false posts will not load as the user scrolls. 
                                   // but will still load if the user clicks.
                    path	: "",
                    q       : "",
                    type    : ""
                }
                
                // Extend the options so they work with the plugin
                if(options) {
                    $.extend(settings, options);
                }
                
                // For each so that we keep chainability.
                return this.each(function() {       
                    
                    // Some variables 
                    $this = $(this);
                    $settings = settings;
                    var offset = $settings.offset;
                    var busy = false; // Checks if the scroll action is happening 
                                      // so we don't run it multiple times
                    
                    // Custom messages based on settings
                    if($settings.scroll == true) $initmessage = 'Loading...';
                    else $initmessage = 'Loading Posts...';
                    
                    // Append custom messages and extra UI
                    $this.append('<div class="content"></div><div class="loading-bar load">'+$initmessage+'</div>');
                    
                    function getData() {

                        
                        // Get data to ajax.php
                        $.get($settings.path, {
                                
                            action        : 'scrollpagination',
                            number        : $settings.nop,
                            offset        : offset,
                            q             : $settings.q,
                            type          : $settings.type
                                
                        }, function(data) {
                                
                            // Change loading bar content (it may have been altered)
                            $this.find('.loading-bar').html($initmessage);

                                
                            // If there is no data returned, there are no more posts to be shown. Show error
                            if(data.gag_count == 0 || data.data == "") { 
                                $this.find('.loading-bar').html($settings.error);   
                            }
                            else {
                                
                                // Offset increases
                                offset = offset+$settings.nop; 

                                var appending_data = add_data(data);
                                    
                                // Append the data to the content div
                                $this.find('.content').append(appending_data);
                                
                                // No longer busy!  
                                busy = false;
                            }   
                                
                        });
                            
                    }   
                    
                    getData(); // Run function initially
                    
                    // If scrolling is enabled
                    if($settings.scroll == true) {
                        // .. and the user is scrolling
                        $(window).scroll(function() {
                            
                            // Check the user is at the bottom of the element
                            if($(window).scrollTop() + $(window).height() > $this.height() && !busy) {
                                
                                // Now we are working, so busy is true
                                busy = true;
                                
                                // Tell the user we're loading posts
                                $this.find('.loading-bar').html('Loading Posts...');
                                
                                // Run the function to fetch the data inside a delay
                                // This is useful if you have content in a footer you
                                // want the user to see.
                                setTimeout(function() {
                                    
                                    getData();
                                    
                                }, $settings.delay);
                                    
                            }   
                        });
                    }
                    
                    // Also content can be loaded by clicking the loading bar/
                    $this.find('.loading-bar').click(function() {
                    
                        if(busy == false) {
                            busy = true;
                            getData();
                        }
                    
                    });
                    
                });
            }

        })(jQuery);


        function add_data(data){

            var generate_content = "";

            for (var i = 0; i < data.data.length; i++) {


                generate_content += '<div class="news-box row"><div class="img-box" style="background-image: url(\''+data.data[i].image+'\');">';
                        

                generate_content += '</div><div class="content-box"><h2><a href="'+data.data[i].fb+'">'+data.data[i].title+'</a></h2><p class="time">Posted under ';

                for (var j = data.data[i].categories.length - 1; j >= 0; j--) {
                
                    generate_content += '<a href="'+data.data[i].categories[j].url+'"><strong>'+data.data[i].categories[j].name+'</strong></a>, ';
                }

                generate_content += ' by '+data.data[i].author_name+' / '+data.data[i].time_ago+'</p>';
                        
                generate_content += '<p class="news-content">'+data.data[i].description+'</p><div class="news-btm row no-margin"><div class="left"><p><span id="likes_'+data.data[i].id+'">'+data.data[i].likes+'</span> Likes  </br>Read more at <a target="_blank" href="'+data.data[i].url+'?ref=pbn">';

                if(data.data[i].publisher_name == ""){
                    generate_content += " PBN";
                }else{
                    generate_content += data.data[i].publisher_name;
                }
                if(data.data[i].like == 1){
                    var likeBtn = `<span id="likeBtn_`+data.data[i].id+`"><a target="_blank" onclick="like(`+data.data[i].id+`,0,`+data.data[i].likes+`)"><i class="fa fa-heart" style="color:red"></i></a></span>`;
                }else{
                    var likeBtn = `<span id="likeBtn_`+data.data[i].id+`"><a target="_blank" onclick="like(`+data.data[i].id+`,1,`+data.data[i].likes+`)"><i class="fa fa-heart-o"></i></a></span>`;
                }
                if(data.data[i].bookmark == 1){
                    var bookmarkBtn = `<span id="bookmarkBtn_`+data.data[i].id+`"><a target="_blank" onclick="bookmark(`+data.data[i].id+`,0,`+data.data[i].likes+`)"><i class="fa fa-bookmark" style="color:#121011"></i></a></span>`;
                }else{
                    var bookmarkBtn = `<span id="bookmarkBtn_`+data.data[i].id+`"><a target="_blank" onclick="bookmark(`+data.data[i].id+`,1,`+data.data[i].likes+`)"><i class="fa fa-bookmark-o"></i></a></span>`;
                }

                generate_content +=  ' </a></p></div>';
                
                generate_content += '<div class="right"> <p> '+bookmarkBtn+' '+likeBtn+ '<a target="_blank" href="http://www.facebook.com/sharer.php?u='+data.data[i].fb+'"><i class="fa fa-facebook"></i></a> <a target="_blank" href="http://twitter.com/share?text='+data.data[i].title+'&url='+data.data[i].twitter+'"><i class="fa fa-twitter"></i></a><a href="javascript:void(0);" onclick=\'responsiveVoice.speak("'+data.data[i].title.replace("'", '')+'","UK English Male");\' ><i class="fa fa-volume-up"></i></a></p>';
                
                generate_content += '</div></div></div></div>';

            }

            return generate_content;

        }