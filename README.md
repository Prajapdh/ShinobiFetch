# ShinobiFetch
A Node.js application that scrapes data from the Naruto fandom wiki, collecting information about characters, clans, jutsu, and episodes. The scraped data is stored in a MongoDB database for easy access and management.

## What does this project do?
ShinobiFetch is a Node.js application that scrapes and stores Naruto anime data from various sources. It extracts information about characters, clans, jutsu, and episodes, and stores it in a MongoDB database.

## Features
- Scrapes character information, including names and details.
- Collects clan data from the Naruto universe.
- Gathers jutsu information.
- Retrieves episode details, including synopses, trivia, and air dates.
- Stores all data in MongoDB.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prajapdh/shinobifetch.git
   cd naruto-data-scraper
   ```
2. Install the dependencies:
    ```bash
    git clone https://github.com/prajapdh/shinobifetch.git
    cd shinobifetch
    ```
3. Create a .env file in the root directory of the project and add your MongoDB connection string:
    ```text
    mongoURL=your_mongodb_connection_string
    ```
4. Run the seeding script to populate the database:
    ```bash
    npm run dev
    ```

**Prerequisites:**

* Node.js version 16 or higher
* MongoDB installed and running
