# FENGSHUI AI

## ① Project Overview

**FENGSHUI AI** is a mobile application that acts as a personal, AI-powered interior designer.

Many people struggle to visualize how to improve their living spaces or feel overwhelmed by the complexity of interior design. FENGSHUI AI solves this problem by allowing users to simply upload a photo of their room and receive an instant, professional-grade design consultation.

**Target Users:** Homeowners, renters, and design enthusiasts who want to refresh their living spaces without the high cost of hiring a human interior designer.

### 🎥 Demonstration Video
[![Watch the Demo](https://img.youtube.com/vi/LTmFzWZd6Fw/0.jpg)](https://youtube.com/shorts/LTmFzWZd6Fw?feature=share)

[Click here to watch the demo on YouTube](https://youtube.com/shorts/LTmFzWZd6Fw?feature=share)

## ② Key Features

- **AI-Powered Design Consultation:** Analyzes user-uploaded room photos using the advanced `gemini-1.5-flash-latest` multimodal AI model to understand the current space.
- **Personalized Design Plans:** Generates a custom design strategy based on the user's specific style preferences (e.g., Industrial, Cottagecore), desired color palette, and budget.
- **Actionable Step-by-Step Guide:** Provides a clear, numbered list of concrete actions the user can take to achieve the new look (e.g., "Paint the north wall navy blue").
- **Smart Shopping List:** Automatically generates a curated list of furniture and decor items that match the new design, complete with affiliate links for easy purchasing.

## ③ Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Node.js, Express.js
- **Database:** None (Stateless architecture)
- **APIs:** Google Gemini API (Generative AI), Expo Camera & Image Picker

## ④ How to Run Locally

Follow these steps to run the application on your local machine.

### 1. Clone the repository
Download or clone this project to your local computer.

### 2. Install dependencies
You need to install dependencies for both the backend and the frontend.

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 3. Set environment variables
You must configure your Google AI API key.

1.  Navigate to the `backend` directory.
2.  Open the `.env` file.
3.  Replace the placeholder text with your actual API key:
    ```
    GOOGLE_API_KEY="AIzaSy...your...actual...key"
    ```

### 4. Run backend
Start the Node.js server. It must be running for the app to work.

```bash
# Inside the backend directory
npm start
```
The server will start at `http://localhost:3000`.

### 5. Run frontend
Start the Expo mobile application.

1.  **Important:** Open `frontend/App.js` and ensure the `API_BASE_URL` matches your computer's local IP address (e.g., `http://192.168.1.X:3000`).
2.  Start the app:
    ```bash
    # Inside the frontend directory
    npx expo start -c
    ```
3.  Scan the QR code with the **Expo Go** app on your mobile device.
