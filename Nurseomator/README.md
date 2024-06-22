## [VERSION FRANCAISE](README.fr.md)

# Nurse-o-Mator

# English

# Introduction

I decided to choose "Nurse-o-Mator" as my project for the PHA Technical Interview/Exam.

First, I had a great time and enjoyed learning about new technologies such as React-Leaflet, Socket.io, and diving deeper into CORS. I now understand its importance for security purposes.

Second, I started last Friday night when I received the GitHub Repo from Bruno (Thanks, Bruno!). I wanted to let you know that my other two coding jobs (part-time) ended this month (June 2024), and I had to go back to work as an electrician. So while working a 40-hour week, I coded about 30 hours on top of that, which was incredibly fatiguing but enjoyable.

If you're worried about me needing to give my two weeks' notice to my current boss if I get this job, there's nothing to worry about. My current boss is aware of my situation and encourages me to continue as a software engineer, knowing this is only temporary.

Third, I usually work as a web developer with a database and RESTful APIs utilizing the CRUD method. When I was researching the stack and middleware, I decided to go with React/JS for the frontend and Node.js/Express.js for the backend. Since this project required real-time updates, I quickly realized the CRUD method wasn't suitable, so I learned how to use Socket.IO. Additionally, I had to learn React-Leaflet, which was straightforward.

Fourth, this project wasn't a typical web development environment. I wrote a lot of JavaScript, more than ever before. I'm not an expert in JavaScript, but this project taught me a lot. GPT helped with directions and object proximity, and I learned a lot from this app. Please excuse any sloppiness in the backend. There are a few random issues, like igloos overlapping or hospitals spawning too close to igloos, but it works well enough.

Fifth, on the frontend, I wanted to create different components and import them to make a clean app.js, but I didn't want to risk breaking the app. This is not how I usually work, but I wanted to finish within a week. All values are stored in the backend and appear on the frontend via Socket.IO.

Sixth, everything is written in English. It's much easier for me to work and Google things in English, so all my notes are in English.

Seventh, I really wanted to implement more features like the Yeti or snow storm but I figured that after a week of waiting, Bruno might think I was doing nothing... If I wasn't working full-time, I would have definitely been able to finish the project 100% within that week.

# Installation Instructions

**Frontend:**

    cd nurseomator
    cd client
    yarn install

        To start React App:
        yarn start

**Backend:**

    cd nurseomator
    cd server
    yarn install

        To start Nodemon/Backend server:
        yarn start

If server port issues occur, please kill ports 3000 (frontend) and 8888 (Socket.IO/node).

# Simulation Explanation

On the top left, the scoreboard counts the number of dead nurses and cured houses.

The "Alerts" section provides real-time updates on nurses, including deaths and cures.

The main screen is a map of northern Canada.

Clicking on a Hospital Icon shows which hospital it is.

Clicking on a nurse provides real-time coordinates, hot chocolate count, countdown timer, and inventory.

Nurses wander aimlessly until they find an igloo with an illness, then they go to the hospital for a cure. They get hot chocolate, the cure, and head to the igloo. Once cured, the igloo icon changes, and the nurse gets more hot chocolate.
If a nurse runs out of hot chocolate, their avatar changes to indicate they're about to freeze. They rush to the hospital for more hot chocolate.
If a nurse dies, their avatar changes to a tombstone. RIP. Solidarity to all the nurses in the world!

Once all igloos are cured, the simulation stops, and you can restart it, which restarts all intervals on the backend.

The map allows for clicking and dragging but zooming is disabled.

# Conclusion

I had an amazing time discovering how to create this app. I apologize for taking a week, but I needed to work to pay my bills. Thanks for the opportunity; it was an incredible learning experience!
