PROXY_URL = "http://localhost:9000/";
var THRESHOLD;
chrome.storage.sync.get(['sensitivity'], function(result) {
        console.log('Sensitivity currently is ' + result.sensitivity);
        THRESHOLD = result.key;
    });

VERY_HACKY_MEMOIZATION = {};

window.onload = function () {
        var links = document.getElementsByTagName('a');
        var titles = [];
        var tagOrderMap = [];
        var globalHeadlineBarrier = 0;

        for (var i = 0; i < links.length; i++) {
            if(links[i].href.includes("news.google.com/articles")){
                if(!links[i].href.includes("myaccount.google.com")){
                    if(!links[i].href.includes("accounts.google.com")){
                        if(links[i].innerText !== ""){
                            titles.push(links[i]);
                            console.log(links[i].innerText);
                        }
                    }
                }
            }
        }
        globalHeadlineBarrier = i;


        function censorTag(j, sentimentData) {
            console.log("CENSORING " + j)
            j.style.backgroundColor = "rgb(32, 33, 36)";
            // j.style.transition = "all 0.3"; // TODO TEST DURATION
            // $(j).parent().hover(function() {$(this).css("background-color", "rgb(32, 33, 36)")}, function() {$(this).css("background-color", "rgb(32, 33, 36)")});
        }

        function requestHandler(u, titles) {
            if (VERY_HACKY_MEMOIZATION[titles[u].innerText]) {
                console.log("Found memo");
                if (((JSON.parse(VERY_HACKY_MEMOIZATION[titles[u].innerText]).emotion.Angry).parseFloat() + (JSON.parse(VERY_HACKY_MEMOIZATION[titles[u].innerText]).emotion.Sad).parseFloat() + (JSON.parse(VERY_HACKY_MEMOIZATION[titles[u].innerText]).emotion.Fear).parseFloat()) > THRESHOLD/500) {
                    censorTag(titles[u], VERY_HACKY_MEMOIZATION[titles[u].innerText]); // SMOL HACK
                }
                return 1;
            }
            httpRequests = new XMLHttpRequest();
            httpRequests.open('POST', PROXY_URL + 'https://apis.paralleldots.com/v4/emotion', true);
            httpRequests.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //httpRequests.setRequestHeader('Accept', 'application/json');
            httpRequests.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    console.log("Request " + u + ": " + this.response);
                    console.log(this.response);
                    try {
                        VERY_HACKY_MEMOIZATION[titles[u].innerText] = JSON.parse(this.response);
                        censorTag(titles[u], this.response);
                        // if ((JSON.parse(this.response).emotion.Angry + JSON.parse(this.response).emotion.Sad + JSON.parse(this.response).emotion.Fear) > THRESHOLD/500) {
                        //     VERY_HACKY_MEMOIZATION[titles[u].innerText] = JSON.parse(this.response);
                        //     censorTag(titles[u], this.response); // SMOL HACK
                        // }
                    } catch (err) {
                         return false;
                    }

                }
            }

            var api_keys = ["JqhbglNQANAFrQYZ6HfYmH96vM4u92CyoEnHM4lp8AM", "xGqJ2AWAJ4hw08xWRNKxNAo8NGk3E3NytpgmIayPtdY", "ttlVqZxpXH4Gs6Kg3T0ETA8a8jun25Wj1hD9jrFMx2o", "1bJnRMtoaMqwymXpE98xpbqu4xq2h1FXX7TYiXtyf28", "LhDnEAFDm5jnVcFoF662pCpwxdViOKNOFKXxFUDzZqg"]
            var rand_key = api_keys[u % api_keys.length];  //api_keys[Math.round(Math.random(0, api_keys.length))]
                httpRequests.send(`text=${titles[u].innerText}&api_key=${rand_key}`);

            console.log("Key: " + rand_key);
        }
 
        for (i = 0; i < titles.length; ++i) {
            requestHandler(i, titles);
        }
 
        var lastScrollTop = 0;
        $(window).scroll(function(event) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                var linksNew = document.getElementsByTagName('a');
                var titlesNew = [];
 
                for (var k = 0; k < linksNew.length; ++k) {
                    if(linksNew[k].href.includes("news.google.com/articles")){
                        if(!linksNew[k].href.includes("myaccount.google.com")){
                            if(!linksNew[k].href.includes("accounts.google.com")){
                                if(linksNew[k].innerText !== ""){
                                    titlesNew.push(linksNew[k]);
                                    console.log(linksNew[k].innerText);
                                }
                            }
                        }
                    }
                }
 
                if (!(titlesNew == titles)) {
                    for (j = titles.length - 1; j < titlesNew.length; ++j) {
                        requestHandler(j, titlesNew);
                    }
                } else {
                    // do nothing if no new articles detected
                }
            } else {
                // do nothing on scroll up
            }
        });
    }
