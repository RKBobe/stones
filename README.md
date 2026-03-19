# ᚱ Rune Stones

A digital divination tool for casting Elder Futhark runes. Built with React and Vite, and bridged to Android via Capacitor, this app combines ancient mysticism with modern AI-powered interpretations.

## ✨ Features

-   **Interactive Casting:** Experience a "physics-based" feel with animated stone drops using Framer Motion.
-   **Elder Futhark Runes:** Complete set of 24 runes plus the blank "Wyrd" stone, including Merkstave (inverted) logic.
-   **AI Seer (Pro):** Integrated Gemini AI to provide deep, mystical interpretations of your specific casts.
-   **Chronicles (Journal):** Save your readings to a local history to track your spiritual journey.
-   **Seer Pro Subscription:** A tiered system that unlocks unlimited AI counsel and infinite journal history.
-   **Haptic Feedback & Sound:** Immersive audio cues for casting stones.

## 🛠️ Tech Stack

-   **Frontend:** React 18, Vite, Framer Motion (Animations)
-   **Mobile Bridge:** Capacitor 8.2.0
-   **AI Engine:** Google Gemini API
-   **Styling:** Vanilla CSS (Custom "Shrine" Theme)
-   **Environment:** Node.js (v22+), Java (JDK 17)

## 🚀 Getting Started

### Prerequisites

-   **Node.js:** v22.0.0 or higher
-   **JDK:** Java 17 (Required for Android Gradle compatibility)
-   **Android Studio:** For building the native APK/AAB

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RKBobe/stones.git
    cd stones
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory and add your Gemini API Key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

### Development (Web)

Run the local development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📱 Android Deployment

This project uses Capacitor to run as a native Android application.

### 1. Build the Web Project
```bash
npm run build
```

### 2. Sync with Android
```bash
npx cap sync
```

### 3. Open in Android Studio
```bash
npx cap open android
```

### 4. Build/Run in Android Studio
-   Ensure your **JAVA_HOME** is set to **JDK 17**.
-   The project is pre-configured to use **Java 17** compatibility in `build.gradle`.
-   Click the **Run** (Green Play) button in Android Studio to launch on an emulator or physical device.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*ᛒᛟᛟᚱᛞ STONES — Created by Khai*
