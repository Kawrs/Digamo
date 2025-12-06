# 🍽 Digamo

**AI-Powered Recipe Generation & Pantry Management**

Digamo helps you reduce food waste and make better meal decisions by generating recipes based on your available pantry ingredients. Stop letting food expire and save money by maximizing what you already have at home.


## 🎯 Why Digamo?
- **Reduce Food Waste** - Use ingredients before they expire
- **Save Money** - Stop buying unnecessary groceries or ordering takeout
- **Eat Healthier** - Cook at home with what you have
- **Get Creative** - Discover new recipes with your existing ingredients

## 🛠 Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Google Gemini 1.5 Flash

## 🤖 AI Integration
Scheather uses live weather data to:
- Provide weather forecast on selected location, date, and time

## 🧪 Installation

1. Clone the project and Install dependencies
   cd digamo
   npm install

2. Configure Firebase
   Create a Firebase project at [Firebase](https://console.firebase.google.com/)
   Add your API Key to lib//firebase/firebaseConfig.ts

3. Configure Google Gemini
   Get an API key from [Google AI Studio](aistudio.google.com)
    Add your API Key to lib/gemini/client.ts

4. Run the app locally:
   npm run dev
   Open http://localhost:3000 with your browser to see the result.

## 🔑 Key Workflows

1. **Add ingredients** to your pantry with expiry dates
2. **Generate recipes** using AI based on what you have
3. **Pick a random meal** when you can't decide
4. **Create grocery lists** for recipes you want to make
5. **Track expiry dates** to minimize waste

Built by 👥 Team B — Computer Engineering students for the Software Development 1 course.
