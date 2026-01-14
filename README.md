# Stock Prediction Portal 📈

A premium Stock Prediction Dashboard built with React and Django REST Framework. This application uses machine learning (LSTM) to predict future stock prices based on historical data from Yahoo Finance.

## ✨ Features

- **Real-time Stock Data**: Fetches historical stock data using `yfinance`.
- **Machine Learning Predictions**: Uses a pre-trained LSTM (Long Short-Term Memory) model to predict stock prices.
- **Visual Analysis**:
  - Original Close Price Plot
  - 100-Day Moving Average (MA)
  - 200-Day Moving Average (MA)
  - Final Prediction vs. Original Price
- **Premium UI/UX**:
  - Modern "FinTech" dark theme with neon glow effects.
  - Responsive layout with high-resolution graphs.
  - Interactive elements and smooth transitions.
- **Model Evaluation**: Displays MSE, RMSE, and R2-Score for the prediction model.
- **Authentication**: Secure JWT-based authentication for the dashboard.

## 🛠️ Tech Stack

### Frontend
- **React.js**: Functional components and Hooks.
- **Vite**: Modern frontend build tool.
- **Bootstrap**: Layout and responsive design.
- **FontAwesome**: Iconography.
- **Axios**: API communication.

### Backend
- **Django REST Framework**: RESTful API development.
- **TensorFlow/Keras**: Loading and running the LSTM prediction model.
- **Matplotlib**: Generating high-resolution analysis plots.
- **yfinance**: Integration with Yahoo Finance API.
- **Simple JWT**: Token-based authentication.

## 🚀 Getting Started

### Prerequisites
- Python 3.x
- Node.js & npm

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend_drf
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend_react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set the backend root:
   ```env
   VITE_BACKEND_ROOT=http://127.0.0.1:8000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🙏 Thank You!
Thank you for checking out the Stock Prediction Portal! If you have any questions or feedback, feel free to reach out. Happy predicting! 🚀
