
# App Title: 

### App Demo: https://sandyddinh.github.io/README/

---

## Concept:

A game inspired by the classic *Family Feud*. In *2020 in Rewind* two teams compete to guess the most popular answer based on surveys (note, unfortunely there were no actual surveys completed). The team with the highest number of points after 3 rounds will be declared the winners.

## Technologies Used:

* HTML
* CSS
* JavaScript 
* External JavaScript Library

##### Credits:

    Unsplash.com
    Coolors.co
    Forbes.com

## Approach:

#### Overview
I started off by writing all of the rules and combinations for a traditional game of *Family Feud*. After evaluating all of the rules and time constraint, I decided to shift my idea to an original game, inspired by *Family Feud* - alas, *2020 in Rewind* came to fruition. I drew my wireframes with the colours blue, yellow, and orange in mind. Upon reflecting on my game, and 2020, I decided I wanted a relaxing and happy UX so I chose a beautiful cloud background, used clean lines, and subtle styling.

#### Wireframe

<img src="/img/wireframe.png" width="70%" >

Color Pallet:

```
    #9BC1BC
    #5CA4A9
    #F4F1BB
    #E37567
    #E6EBE0
    #363537
```

#### Development Plan 

The development plan was to start off with very basic HTML, no CSS, and a lot of JavaScript. Once most of the functionality was in place and working with the console, I focused on populating the DOM and HTML and CSS for visual effects.

* Develop the Team object and minimum functions required to compare an input to a list of answers.
* Develop functions to keep track of points, strikes, answers, who's turn it is, etc.
* Develop rest of functions (like stealing the points) to support the rules.
* Populate the DOM with all game information.
* Add some modals.
* Style the game!

<img src="/img/rules.png" width="60%" >

#### MVP

* Answer one round of questions
* Extend the game to 3 rounds
* Start a new game

#### Stretch goals

If I had time I would have...

* Compared answers for partial match.
* Checked to see if the answer is already on the board.
* Allowed users to select how many players per team.
* Added a rule where one player would face off with another player from the other team.
* Actually conducted a survey!

## Challenges:

I had a hard time figuring out the best way to keep track of the 'current team' and the 'other team'. I explored a couple of options such as using buttons - as I was implementing this realized this wouldn't work if user erroneously switches the teams at the wrong time.

## Question and Answer Key:
<details>
  <summary>So that you can try all the features. Click to expand!</summary>
  
  1. Question: What was the quickest grocery store item to sell out in March?
     * Toilet paper
     * and sanitizer
     * Clorox wipes
     * Canned food
     * Pasta
     * Soap
     * Frozen Pizza
     * Bottled Water
  2. Question: What was the best Neflix Original?
     * Tiger King
     * Locke & Key
     * Space Force
     * Outer Banks
     * Love is Blind
     * The Queen's  Gambit
     * Never Have I Ever
     * Ratched
  3. Question: What was the most downloaded iPhone app?
       * Zoom
       * TikTok
       * Disney Plus
       * Youtube
       * Instagram
       * Facebook
       * Snapchat
       * Messenger
</details>


### App Demo: https://sandyddinh.github.io/README/
