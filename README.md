# ORCA (Operational Risk & Compliance Assistant)

An AI-powered platform for manufacturing and industrial automation that leverages machine learning, GenAI, and IoT data to provide intelligent operational risk management and compliance monitoring.

## 🚀 Features

- **🦈 PREDATOR**: ML-powered equipment failure prediction using NASA C-MAPSS dataset
- **🛡️ GUARDIAN**: Regulatory compliance monitoring and audit automation
- **🔮 MIRROR**: Digital twin simulation and scenario planning
- **🚨 SIREN**: Real-time alerting with AI-powered context and guidance
- **AI-Powered Insights**: Gemini Pro API integration for intelligent summaries
- **Modern Dashboard**: Responsive Next.js 15+ frontend with Tailwind CSS
- **RESTful API**: Flask backend serving ML predictions and insights

## 🏗️ Project Structure

```
ORCA/
├── backend/                 # Flask Python backend
│   ├── app/                # Main application code
│   ├── models/             # ML models and data processing
│   ├── api/                # API endpoints and routes
│   ├── utils/              # Utility functions and helpers
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend application
│   ├── components/         # React components
│   ├── pages/              # Next.js pages and routing
│   ├── styles/             # CSS and Tailwind styles
│   └── package.json        # Node.js dependencies
├── project.md              # Detailed project documentation
└── README.md               # This file
```

## 🛠️ Technology Stack

### Backend
- **Flask** - Python web framework
- **Python 3.8+** - Core programming language
- **Scikit-learn** - Machine learning models
- **Pandas/NumPy** - Data processing
- **Gemini Pro API** - Google's GenAI integration

### Frontend
- **Next.js 15+** - Latest React framework
- **Tailwind CSS** - Utility-first CSS framework
- **React 18+** - Component library
- **Chakra UI** - Modern component library
- **Chart.js** - Data visualization
- **Axios** - HTTP client

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn package manager
- Google Cloud account (for Gemini Pro API access)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ORCA
```

### 2. Backend Setup (Flask)
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export FLASK_APP=app
export FLASK_ENV=development
export GEMINI_API_KEY=your_gemini_api_key

# Run the Flask application
flask run
```

### 3. Frontend Setup (Next.js)
```bash
cd frontend

# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
```

### 4. Access the Application
- Backend API: http://localhost:5000
- Frontend Dashboard: http://localhost:3000

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_APP=app
FLASK_ENV=development
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_database_url
MODEL_PATH=path_to_ml_models
```

### API Configuration

The Flask backend provides the following endpoints:

- `GET /api/health` - Health check
- `GET /api/predictions` - Get ML model predictions
- `POST /api/analyze` - Analyze sensor data
- `GET /api/insights` - Get AI-generated insights

## 📊 Data Sources

- **NASA C-MAPSS Dataset**: Turbofan engine degradation simulation data
- **IoT Sensors**: Real-time manufacturing equipment data
- **Historical Records**: Equipment maintenance and failure logs

## 🤖 Machine Learning Models

The predictive maintenance system uses:
- **RUL Prediction**: Regression models for remaining useful life estimation
- **Anomaly Detection**: Unsupervised learning for equipment health monitoring
- **Feature Engineering**: Sensor data preprocessing and feature extraction

## 🎨 UI Components

The frontend includes:
- **Dashboard Layout**: Responsive grid-based design
- **Data Charts**: Interactive visualizations using Chart.js
- **Status Cards**: Equipment health indicators
- **Alert System**: Real-time notifications and warnings
- **Reports Panel**: Exportable maintenance summaries

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm run test
```

## 📦 Deployment

### Backend Deployment
```bash
cd backend
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend Deployment
```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the project documentation

## 🔮 Roadmap

- [ ] Complete PREDATOR (Predictive Maintenance) module
- [ ] Implement GUARDIAN (Regulatory Compliance) module
- [ ] Add MIRROR (Digital Twin Intelligence) capabilities
- [ ] Develop SIREN (Real-Time Alerting) system
- [ ] Mobile application development
- [ ] Advanced ML model optimization

## 🙏 Acknowledgments

- NASA for the C-MAPSS dataset
- Google for Gemini Pro API
- Open source community for the amazing tools and libraries

---

**ORCA** - Making industrial operations smarter, safer, and more efficient through AI-powered insights.
