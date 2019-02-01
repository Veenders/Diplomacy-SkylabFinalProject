# Atomic Diplomacy by Veenders

## Introduction

Puedes ver el proyecto en [diplomacy.veenders.com](https://diplomacy.veenders.com)

### Diplomacy Game

>Diplomacy is a strategic board game created by Allan B. Calhamer in 1954 and released commercially in 1959.[1] Its main distinctions from most board wargames are its negotiation phases (players spend much of their time forming and betraying alliances with other players and forming beneficial strategies)[2] and the absence of dice and other game elements that produce random effects. Set in Europe in the years leading to the Great War, Diplomacy is played by two to seven players,[3] each controlling the armed forces of a major European power (or, with fewer players, multiple powers). Each player aims to move his or her few starting units and defeat those of others to win possession of a majority of strategic cities and provinces marked as "supply centers" on the map; these supply centers allow players who control them to produce more units. Following each round of player negotiations, each player can issue attack orders and take control of a neighboring province when the number of provinces adjacent to the attacking province that are given orders (written down and declared in advance) to support the attacking province exceeds the number of provinces adjacent to the province under attack that are given orders to support the province under attack.

>Diplomacy was the first commercially published game to be played by mail (PBM); only chess, which is in the public domain, saw significant postal (long distance) play earlier. Diplomacy was also the first commercially published game to generate an active hobby scene with amateur fanzines; only science-fiction, fantasy and comics fandom saw fanzines earlier. Competitive face-to-face Diplomacy tournaments have been held since the 1970s. Play of Diplomacy by e-mail (PBEM) has been widespread since the late 1980s.[4]

>Diplomacy has been published in the United States by Games Research, Avalon Hill, and Hasbro; the name is currently a registered trademark of Hasbro's Avalon Hill division. Diplomacy has also been licensed to various companies for publication in other countries. Diplomacy is also played on the Internet, adjudicated by a computer or a human gamemaster.

English Wikipedia entry about [Diplomacy Game](https://en.wikipedia.org/wiki/Diplomacy_(game))

### This Project

I've been playing board games and role since I was 14 years old, otherwise, computer games have never quite hooked me, I guess that being ducks is what you have, now seriously, the reality is that social interaction What is produced in a board game with all your friends around is difficult to simulate on a computer screen.

With certain friends, due to the distance to which, over time, family obligations were becoming more and more important and therefore it was becoming increasingly difficult to start playing certain games through an email system [(Cyberboard)](https://cyberboard.brainiac.com/) was a fun way to keep in touch and combined with whatsApp and messaging systems made it fun to have contact and play again.

In this game system we had games like Necromancer, Diplomacy or the Game of Thrones, which combine perfectly in Play by Mail because there is almost nothing of randomness in its operation.

That's why when in the course of Skylab FrontEnd development we had to choose a project, I thought that the option I would most like would be to develop a system to play with friends to these games.

Initially the choice was the game of Thrones, since I had already done a previous development and I was familiar, but in the orientation meeting of the project we saw that in the end it had many small components that would be repetitive to develop, so they did not add value, at the same time that they were going to subtract time from the project. That is why we decided to change to Diplomacy, a simpler game in operation, although more complex in the game algorithm (too bad I realized halfway through the project)

## Functional Description

When the user enters the page, they are offered the options of searching for a game or creating a new one with the intention of minimizing the navigation of the user who already knows what is coming and going to play. For those who are not used to it, the menu is offered on the right side with the option to visit the Blog, See the Rules or the Games in progress. Also in the menu you have the option to enter the application.

If you access the games you can see the basic information of them, but if you want to enter a game or create a system, the login screen is displayed, from where you can register if you do not have an account.

Once the login is done, I see the items that I have created or that I am writing together with the open items. there I can point to any game, by entering the entry code if the user who created it defined it and i can access the games I am playing.

#### Functional Diagram
![Diagrama Funcional](https://github.com/Veenders/Veenders-React/blob/develop/Documentation/Functional_Diagram.png?raw=true)

## Tecnical Description
Atomic Diplomacy is the Final project of Skylab's FrontEnd course and the Front have an special weight in the project.

All the project is created on ReactJs, using firebase for backend service and Redux to have a Global Scope.

All the project use Javascript and JSX.

The design is implemente with SCSS rendered to CSS with node-sass.

### Project Structure

When you can search elements, the src Directory Description

* Components: All the Components and structure
    * App: The entry point of the App, Redux and User Entry.
    * Auth: Login, Register and ResetPwd.
        * Login Component.
        * Register Component.
        * ResetPwd Component. Not implemented.
    * diplomacy: Control when you are playing the game.
        * HeadGame: The Header when you play.
        * Map: Draw the map and Starting Drag Feature.
        * Messenger: Online Messenger Component.
        * Orders: to Set the armies Orders.
        * Retreats: to Set the Retreats Orders.
        * UnitStatus: Create and Destroy Units at finishing Autumn
    * GameForm: Create and Edit Form.
    * gamesList: List of Game Items.
        * GameItem: The card to see the Game Info.
    * Header: The Main Menu
    * Loading: Loading Animation.
    * Modal Comportament: The Modal Component to see information.
    * postLists: The list of Blog and rules items.
        * postItem: Every Post and Rules Element.
    * StartGame: The magic button to create the game.
    * Veenders: Future's misteries.
    * VerifyCode: The Component to verify if the Code to enroll is correct or not.
* data: JSONs with necessary data to manage the elements
    * country.js:Color's, and initial settings of every country
    * map.js: The information of all the elements in the map.
* img: All the fixed images of the project.
* Redux: Redux Actions and Reducers.
* Services: The connection layer with firebase.
    * AuthService: User Login, Register, Logout and online presence.
    * DBService: Connection with the firebase Database
    * FileService: Upload Profile Images.
* Views: All the views on the aplication.
    * Component404: What happens when the page doesn't exist
    * Game: The Basic Structure of Game Detail and Playing Game.
    * Games: The List of Games.
    * Main: The Landing Page.
    * NewGame: The view to Create and Edit Games.
    * NotAuthorized: The view when you want to acces when you can't.
    * Posts: The Blog and Rules view.
    * UserView: The Profile View.

## Data model structure.


Taking advantage of the fact that firebase works with non-relational formats, the data structure is similar to this "JSON":

```json
users :[{
        uid: unique string,
        email: string,
        name: string,
        lastname: string,
        birthdate: date,
        image: string,
        rol: number
    }]
posts :[{
        category: string(rules or blog),
        title: string,
        content: string,
}]
message :[{
    id: unique string,
    diplomacy_id: unique string,
    chat: [{
        from: users.uid Sender,
        to: users.uid reciver or 0 to all,
        message: string
    }]
}]
diplomacy :[{
    id: unique string,
    name: string,
    cooperative: boolean,
    countryAssign: boolean,
    open: boolean,
    code: string,
    numturn: number,
    user: users.uid (Game Creator),
    started: boolean,
    players:[{
        uid: users.uid,
        name: users.name,
        country: string
    }]
    turns: [{
        id: diplmacy.id,
        phase: number,
        year: number,
        season: string (spring or autumn)
        userturn: [{
            country: string,
            finishedOrders: boolean,
            finishedRetreats: boolean,
            finishedUnitStatus: boolean,
            player: users.uid
            territories:[string]
            armies: [{
                country: string,
                id: string (year of Creation+Territory of Creation),
                territory: string,
                type: string (army or fleet)
            }]
            orders: [{
                id: army.id,
                order: string (hold, move, support, transport),
                origin: string,
                destination: string,
                support: string,
                to: string,
            }]
            Retreats: [{
                id: army.id,
                origin: string,
                destination: string(destroy to delete)
            }]
            UnitsStatus: [{
                id: army.id,
                country: string,
                territory: string,
                type: string,
            }]
        }]
    }]
}]
```