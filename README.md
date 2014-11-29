Address Book Application
=======

The address book application is a simple application built with Node.js, Angular and MySQL

#### Project installation requirements

This project requires Node.js and MySQL

#### Install Node.js and MySql

1. Node.js can be found at http://nodejs.org
2. The easiest way to set up MySql is to download MAMP http://www.mamp.info/en/ (for Mac) or WAMP http://www.wampserver.com/en/ (for windows)

#### Open a terminal window

1. In the terminal run > npm install -g nodemon
2. Clone the address repository to ant desired location
3. In the terminal, run > npm install
4. In the terminal run > bower install

** Steps 5 and 6 will install all of the projects required node modules and JavaScript dependencies

#### Set up the database

1. Import the addressbook_2014-11-26.sql file to set up the addressbook database and its tables

#### Run the Project

1. Start your local MAMP or WAMP server... or whatever MySQL installation you decided to use
2. Open 2 terminal windows and CD into the project directory
3. In the first terminal window, type > nodemon server.js
4. In the second terminal window, type > grunt to build the project
5. Open a browser window and type > localhost:3000