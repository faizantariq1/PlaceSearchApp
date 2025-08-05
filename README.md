**Places Search & Map Viewer**

A React Native application that allows users to search for places using Google Maps Places API, view them on a map, and maintain a search history.

**Prerequisites**
Before you begin, ensure you have:


npm or yarn

React Native development environment set up

Google Cloud account with:

Places API enabled

Valid API key with billing enabled

**Setup Instructions**
   1. Clone the repository

     git clone https://github.com/faizantariq1/PlaceSearchApp.git

   2. Install dependencies

      npm install
      or
      yarn install

   3. Configure environment variables

    Create a .env file in the root directory:
     GOOGLE_PLACES_API_KEY=your_api_key_here

   4. iOS setup  

    cd ios && pod install && cd ..

   5. Android map key

    Add your API key to android/app/src/main/AndroidManifest.xml: 
     <meta-data
        android:name="com.google.android.geo.API_KEY"
        android:value="your_map_key" />

   6. IOS map key

       go to info.plist file
       <key>GMSApiKey</key>
	   <string>your_map_key</string>     

   7. to run on ios
       yarn ios

   8. to run on android   
       yarn android 

       --------------------------------------------------------
      ** Project Architecture Approach**
        1. State Management Strategy
            I'll intentionally avoid Redux, Context API, or Zustand for state management in this project since:

            The application scope is limited and doesn't require complex state sharing

            React's built-in state management with hooks provides sufficient capability

            I want to demonstrate clean, minimal state handling without external dependencies
        2. API Handling Approach
            Instead of using Axios or GraphQL, I'll implement:

            A fetch request. but for now these are not required. for making code minimal i also does not created a separate api manager for get,post etc request.

        3. Component Approach:
            Also, in my development pattern, I create custom components for elements like TextInput, Text, Button, etc., so they can be reused with consistent styling across the app in the future.
       --------------------------------------------------------
