# Build Your ChatGPT

Welcome! 

YourChatGPT is a versatile AI chatbot solution that harnesses the capabilities of the ChatGPT API. Crafted to simplify your journey, it enables you to create a tailored ChatGPT clone effortlessly.

Feel free to visit our website to explore a comprehensive introduction and experience a demo of the sample Chatbot in action: [Build Your Own ChatGPT]()

**Backend package**: https://github.com/phrazhola/YourChatGptBackendService

## Highlights
-   **Structured Code:**  The codebase is well-organized, making it easy to understand and customize for different styles and use cases.
-   **Extensible API:**  The API is designed with extensibility in mind, offering flexibility for future enhancements.
-   **Scalability:**  The architecture supports scalability, with a clear separation between the frontend UI and backend API.
-   **Plug-and-Play:**  The solution is ready to use, requiring only API key setup.
-   **Security First:**  The system prioritizes security by ensuring your OpenAI API key remains secure on the client side.

# Setup

There are only two things you need to setup :

- Google Login API onboarding
- Backend application endpoint

## Google Login API 
1.  **Create a Project in Google Cloud Console**:
    
    -   Go to the [Google Cloud Console](https://console.cloud.google.com/).
    -   Create a new project or select an existing one.
2.  **Enable Google APIs**:
    
    -   In the Google Cloud Console, navigate to the "APIs & Services" > "Library" section.
    -   Search for and enable the "Google+ API" or "Google Identity Platform API". This depends on your requirements.
3.  **Create OAuth Client ID**:
    
    -   In the Google Cloud Console, navigate to "APIs & Services" > "Credentials" section.
    -   Click on the "Create Credentials" button and select "OAuth client ID".
    -   Choose "Web application" as the application type.
    -   Enter authorized JavaScript origins (your website's URLs) and redirect URIs (where Google will redirect after authentication).
4.  **Retrieve Client ID and Secret**:
    
    -   After creating the OAuth client ID, you will get a client ID and client secret. Keep these secure.
5. **Setup client ID as the environment variable**

    - Set up environment variables using the `.env` files or in the environment where you deploy your code and then access it by `process.env.YOUR_KEY`.

## Backend application endpoint
- Build and deploy your backend package by whatever options you want, setup the endpoint and specify it as environment variable or in the `/src/common/constants.ts` file.

