## Inspiration
Ever since the pandemic, my mom has gotten more and more depressed. Why? Because she's constantly scrolling through negative news and sad articles about the state of the world on Facebook. Yes, it's important to stay informed, but there comes a point where doomscrolling is just harmful. 

The National Institute of Health says that doomscrolling is a "vicious cycle" and can cause "increased feelings of depression and anxiety" like I've experiences with my dad. So, I wanted to create a simple solution to all this negative news.

## What it does
AntiScroll processes Facebook feed posts to check whether or not they will be upsetting to the reader. If a post is found to be harmful, it will be blocked and the reader will be spared from being sad.

## How we built it
AntiScroll scrapes your Facebook feed for text content (posts and captions), it uses IBM Watson's tone analyzing NLP Model by sending requests to the service's server. It parses the server's response and uses it to determine the overall tone of each post on your feed and shows the dominant tone next to each post.

## Challenges I ran into
As a newcomer, working with the Watson was really difficult, and there was not much guidance. I also had a lot of trouble with extracting the headlines and had to spend multiple hours on Stack Overflow. Additionally, I am not that experienced at JavaScript, so creating a working extension was a great learning experience.

## Accomplishments that I'm proud of
I'm proud that I was able to put together a functional app in less than two days with my limited prior experience of JavaScript and working with APIs.

## What's next for Antiscroll
I would like to possibly incorporate machine learning to tailor news blocking to specific user's needs. Also, I might try to make this work on Twitter, because my dad gets a lot of news from there. 
