Address Book Application
=======

The address book application is a simple application built with Node.js, Angular and MySQL

### Project Setup

This project requires Node.js and MySQL

#### Install Node.js and MySql

1. Node.js can be found at http://nodejs.org
2. The easiest way to set up MySql is to download MAMP http://www.mamp.info/en/ (for Mac) or WAMP http://www.wampserver.com/en/ (for windows)

#### Open a terminal window

3. In the terminal run > npm install -g nodemon

** Nodemon will automatically restart the server whenever changes are made. Without this you would have to restart the server manually

4. Clone the address repository to ant desired location
5. In the terminal, run > npm install
6. In the terminal run > bower install

** Steps 5 and 6 will install all of the projects required node modules and JavaScript dependencies

#### Set up the database

7. Import the addressbook_2014-11-26.sql file to set up the addressbook database and its tables

### Run the Project

8. Start your local MAMP or WAMP server... or whatever MySQL installation you decided to use
9. Open 2 terminal windows and CD into the project directory
10. In the first terminal window, type > nodemon server.js
11. In the second terminal window, type > grunt

** Step 11 will build all of the project's required JavaScript and CSS, as well as run all of its unit tests

12. Open a browser window and type > localhost:3000