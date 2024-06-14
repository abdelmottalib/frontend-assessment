# Gif Search and Display Application

This project is a simple NextJs application that allows users to search for GIFs using the Giphy API. Users can view trending GIFs, search for specific GIFs, and click on a GIF to view related GIFs.

## Features

- Fetch and display trending GIFs from Giphy.
- Search for GIFs using a search query.
- Click on a GIF to view related GIFs.
- Adjust the size of the displayed GIF.

## Technologies Used

- Next.js
- Axios
- Lodash (for debouncing)
- Giphy API

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/abdelmottalib/frontend-assessment
   cd frontend-assessment
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project and add your Giphy API key:

   ```env
   NEXT_PUBLIC_GIPHY_API_KEY=your_giphy_api_key
   ```
    - you can get the api key from the ones provided for the assessemnt or create your own in the next section.
    
4. **Run the development server:**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Obtain the Giphy API Key

1. **Sign up for a Giphy Developer Account:**

   Go to the [Giphy Developers](https://developers.giphy.com/) website and sign up for a developer account if you do not already have one.

2. **Create an App:**

   Once you have signed in, navigate to the "Create an App" section and click on "Create New App."

3. **Select API:** 

   Choose the API option for the type of app you are building.

4. **Fill in App Details:**

   Enter the required details about your app, such as the app name and description. 

5. **Get Your API Key:**

   After creating your app, you will be provided with an API key. Copy this key and add it to your `.env.local` file as shown above.

## Usage

- **Search GIFs:**
  - Use the search bar to enter a query and find GIFs related to your query.
  - The search is debounced to optimize performance.

- **View Trending GIFs:**
  - By default, the application displays trending GIFs from Giphy.

- **View Related GIFs:**
  - Click on any GIF to view related GIFs in a modal.

- **Adjust GIF Size:**
  - Within the modal, use the buttons to adjust the size of the selected GIF.

## Components

- **Home:** The main component that manages state and handles API calls.
- **GifGrid:** A component to display a grid of GIFs.

## Environment Variables

- `NEXT_PUBLIC_GIPHY_API_KEY`: Your Giphy API key for accessing the Giphy API.