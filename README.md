# Airbnb Clone (Under Development)

This project is an **Airbnb clone** built using **Express**, **MongoDB**, and **EJS** templates. The goal is to replicate some of the core functionalities of Airbnb, such as managing property listings, viewing details, and performing basic CRUD operations.

## Features (In Progress)

- **View all listings**: Displays a list of all property listings (basic functionality completed).
- **Create new listings**: Users can add new listings with details like title, description, price, location, and country (still under development).
- **Edit listings**: Users can update existing listings (in progress).
- **Delete listings**: Remove listings from the system (in progress).
- **Detailed view of listings**: Each listing can be viewed in more detail (functionality partially implemented).

## Tech Stack

- **Express**: Web framework for building the server.
- **MongoDB**: NoSQL database to store listings data.
- **Mongoose**: ODM to interact with MongoDB.
- **EJS**: Templating engine for rendering HTML pages.
- **Method-Override**: To handle PUT and DELETE requests in forms.
- **ejs-mate**: A simplified version of EJS with extra features like layout support.

## Setup

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB (local or cloud-based)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/airbnb-clone.git
    ```
2. Install dependencies:
    ```bash
    cd airbnb-clone
    npm install
    ```
3. Start MongoDB locally (or use a cloud-based MongoDB instance).
4. Start the server:
    ```bash
    node app.js
    ```
5. Open your browser and visit `http://localhost:3000` to see the application in progress.

## Routes (Work in Progress)

- **GET /listings**: View all property listings (Completed).
- **GET /listings/new**: Add a new property listing (Work in progress).
- **GET /listings/:id**: View a detailed listing (Completed).
- **POST /listings**: Submit a new listing (Work in progress).
- **GET /listings/:id/edit**: Edit an existing listing (In progress).
- **PUT /listings/:id**: Update a specific listing (In progress).
- **DELETE /listings/:id**: Delete a specific listing (In progress).

## Development Progress

- Basic functionality for listing management is implemented, but some features (like editing and deleting listings) are still under development.
- More features like user authentication, search functionality, and user reviews will be added in future updates.

## Future Improvements

- **User Authentication**: Implement login/signup features and restrict certain actions (create/edit/delete listings) to authorized users.
- **Search**: Add a search feature to filter listings based on parameters like price, location, etc.
- **Reviews**: Allow users to leave reviews and ratings for listings.
- **UI/UX Enhancements**: Make the UI more user-friendly and responsive (planned to move to React/Vue in the future).

## License

This project is under development and is not yet complete. More updates will be made soon.
