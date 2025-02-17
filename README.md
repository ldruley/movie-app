# Project 01 Retrospective and overview

[Github Repo](https://github.com/ldruley/movie-app)

## Overview
This is a movie app that makes use of an API we found [here](https://github.com/public-apis/public-apis?tab=readme-ov-file).

We got styling help for this document from [this guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Introduction

* We primarily coordinated via slack and in-class meetings
* We originally planned 14 stories
* We completed 12, having lost 1 team member, cutting two stories. Others were merged during development into a single feature

## Team Retrospective

### Logan Druley
1. Logan's pull requests are [here](https://github.com/ldruley/movie-app/pulls?q=is%3Apr+author%3Aldruley+is%3Aclosed)
1. Logans's Github issues are [here](https://github.com/ldruley/movie-app/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3Aldruley)

#### What was your role / which stories did you work on
I worked on the homepage (which displays trending movies), the movie details page, did some initial database setup and code, integrated movie details links into other pages, did some work on trying to unify the UI, and made the favorites API integration & page.

+ What was the biggest challenge? 
  + Definitely ramping up on react native, and dealing with initial issues with the project relating to a teammate dropping and android emulator
+ Why was it a challenge?
  + It's a short project window, we need to get up to speed on react native, in addition to having to get into a team rhythm with workflow and git
+ How was the challenge addressed?
  + Just pushing through it and making the progress we could.
+ Favorite / most interesting part of this project
  + React Native is pretty cool, it feels much faster to get going and iterate after the initial hurdles getting things going and understanding the tech
+ If you could do it over, what would you change?
  + I would have thought through the database and api more, and I would have started with building reusable react components - they would help a lot towards unified design and also make it much easier to add new features since most api endpoints we could use have very similar data structures and it would be pretty trivial to add more features if we had a solid base of reusable components. I simply didn't have the comfort level to start out with this, not knowing how things fit together in react.
+ What is the most valuable thing you learned?
  + If you hardcode api params for testing, make sure you leave yourself a comment... don't ask. I didn't lose hours on this.

### Justin Ho
1. Pull requests: https://github.com/ldruley/movie-app/pulls?q=is%3Apr+author%3AJjustinnHo+is%3Aclosed+
2. Issues: https://github.com/ldruley/movie-app/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3AJjustinnHo
#### What was your role / which stories did you work on
I worked on the search page that allows a user to search movies by text input and to filter any searched movies by genres. Major functionalities included displaying
the list of genres from TMDB API refernce list, searching for movie titles based on text input, selecting/deselecting genres from genre list for movie searches, and displaying details for searched movies when they are clicked.

### Ethan Pimentel

- https://github.com/ldruley/movie-app/issues?q=state%3Aclosed%20is%3Apr%20author%3A%40me
- https://github.com/ldruley/movie-app/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3APimentelEthan

#### I worked on connecting the user login and registration info to the database as well as design a search by actor or director function.

+ Connecting the users input to the database
+ It didn't seem to route correctly when sent through. 
  + I fixed the database.js routing in the folder as well as teh call to the databse when it was initialized in the login and registartion pages.
+ Seeing our ideas come to display.
+ Get the database started and connected earlier, first PR.
+ Everyone must be on the same page when it comes to completing their issues / stories, so the merges work properly.

## Conclusion

- How successful was the project?
  - It was reasonably successful, I was pretty concerned for a bit about what we would be able to complete but it did come together I think - the features we have work well under testing and it looks decent too. We could have done more features, but went for polish on what we had, which was the correct decision we think.
- What was the largest victory?
   - Just getting the project to come together, initially it was quite the skeleton but once we got our features in, all of a sudden it started to feel like something worth showing.
- Final assessment of the project
   - It's ultimately a simple app, for anything past a school project you'd want to do a lot more, but it does what it does well and we were able to get a decent bit of polish on it for a development time that was so short (and shorter still due to issues getting going). There's no major issues with functionality, it's fast and looks decent. 
