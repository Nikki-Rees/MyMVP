# ProjectOne

https://nikki-rees.github.io/ProjectOne/


# Description:

This application enables the user to search their favourite NBA player which will display the current 2019-2020 season stat average for the respective player - the browser will also render a youtube highlight video and display 5 GIFs to the user. The purpose of this project was to demonstrate team collaborative efforts in implementing AJAX functions, returning information from remote APIs and dynamically render new information to the browser as the user searches different players.  

# Keypoints:

* Utilised jQuery functionality to call AJAX methods and request information from remote APIs 
* Demostrated calling a nested AJAX function using information returned from initial AJAX request.
* Remote APIs used:
    - Balldontlie.io: Passed search input value in to API to return individual player information and used playerID response to call another Balldontlie API to return individual player stats
    - GIPHY: Passed search input value to return GIF images of that player and render them onto the browser
    - Youtube Data API: Search input value queries the Youtube Data API and retrieves the first available youtube video ID from the search response, which then dynamically changes the video playing in the browser.
* Use of Bulma CSS Framework to style the application.
* Use of local storage to save any previously saved players and render the last displayed player upon refresh of browser


Link to deployed application: https://nikki-rees.github.io/ProjectOne/


1. Upon initial launch of the application, user will see the following screen:

*SCREENSHOT*


2. Users can type the name of an NBA player and search them when they click on the search button:

*SCREENSHOT*

3. Browser will load the following:
    - Players Name, height, Weight and Position played
    - Details regarding their current team (City, Conference, Division)
    - Average current season stats
    - A youtube video based on a search of the name of the player
    - GIFs featuring the searched player


*SCREENSHOT*

4. Users will have the option to save their favourite player searches by pressing the save button beside the player's name


*SCREENSHOT* 

4a. the last saved player will appear as a button above

*SCREENSHOT*


4b. if user clicks a previously saved player button, this will trigger a new search and render the relevant player information

*SCREENSHOT*


5. when user refreshes page, last saved player's information will be displayed.

*SCREENSHOT*


# Notes/Issues:

* Due to limitations with free access to Youtube Data API, there is a finite quota of queries to the remote API. Once quota is reached, a new project and API key will need to be generated. 

* current features in the pipeline to be intergrated into the application: 
    -Carousel GIF 