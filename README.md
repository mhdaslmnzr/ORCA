# ORCA (Operational Risk & Compliance Assistant)

An AI-powered platform for manufacturing and industrial automation that leverages **Large Language Models (LLMs)**, **simulation engines**, and **IoT sensor data** to deliver **four intelligent agents** for operational risk management and compliance monitoring.

## 🚀 Features

### **Four Intelligent Agents**
- **🦈 PREDATOR**: **Maintenance Agents** - Predictive maintenance summaries using IoT sensor data + agentic task planner
- **🛡️ GUARDIAN**: **Compliance Monitors** - Agents that verify if internal reports meet ISO or industry compliance guidelines
- **🔮 MIRROR**: **Digital Twin Assistants** - Use LLMs to interpret simulations and explain deviations from ideal performance
- **🚨 SIREN**: **Alerting APIs** - LLM + simulation engine + alerting APIs for real-time intelligent notifications

### **Core Capabilities**
- **AI-Powered Insights**: Gemini Pro API integration for intelligent summaries and recommendations
- **Modern Dashboard**: Responsive Next.js 15+ frontend with Chakra UI for enterprise-grade interface
- **RESTful API**: FastAPI backend serving ML predictions, compliance checks, and AI insights
- **Real-time Monitoring**: Live IoT sensor data processing and intelligent alerting

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
- **FastAPI** - Modern Python web framework for high-performance APIs
- **Python 3.8+** - Core programming language for ML models and data processing
- **Scikit-learn** - Machine learning models for predictive maintenance
- **XGBoost** - Advanced ML algorithms for RUL prediction
- **Pandas/NumPy** - Data processing and numerical computations
- **Gemini Pro API** - Google's GenAI for intelligent insights and LLM capabilities
- **Simulation Engine** - Digital twin simulation capabilities

### Frontend
- **Next.js 15+** - Latest React framework with App Router
- **Chakra UI** - Modern component library for enterprise-grade interface
- **React 19+** - Latest component library with advanced features
- **TypeScript** - Full type safety throughout the application
- **Chart.js** - Data visualization for sensor data and predictions
- **Real-time Updates** - Live data streaming and monitoring capabilities

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

The FastAPI backend provides the following endpoints for the four intelligent agents:

#### 🦈 PREDATOR (Maintenance Agents)
- `POST /api/predict-with-report` - Get RUL predictions with AI-generated maintenance summaries
- `GET /api/equipment-health` - Real-time equipment health monitoring
- `POST /api/maintenance-plan` - AI-powered task planning and scheduling

#### 🛡️ GUARDIAN (Compliance Monitors)
- `POST /api/compliance-check` - Verify reports against ISO and industry standards
- `GET /api/compliance-status` - Real-time compliance monitoring
- `POST /api/audit-report` - Generate audit-ready documentation

#### 🔮 MIRROR (Digital Twin Assistants)
- `POST /api/simulation-analysis` - LLM interpretation of simulation results
- `GET /api/performance-deviations` - AI analysis of performance deviations
- `POST /api/scenario-planning` - Run "what-if" scenarios with AI insights

#### 🚨 SIREN (Alerting APIs)
- `POST /api/alert` - Send intelligent alerts with AI-powered context
- `GET /api/alert-priority` - AI-powered alert prioritization
- `POST /api/remedial-actions` - Get AI recommendations for issue resolution

## 📊 Data Sources

- **NASA C-MAPSS Dataset**: Turbofan engine degradation simulation data
- **IoT Sensors**: Real-time manufacturing equipment data
- **Historical Records**: Equipment maintenance and failure logs

## 🤖 Machine Learning & AI Models

### 🦈 PREDATOR (Maintenance Agents)
- **RUL Prediction**: XGBoost regression models for remaining useful life estimation
- **Anomaly Detection**: Unsupervised learning for equipment health monitoring
- **Feature Engineering**: Sensor data preprocessing and feature extraction
- **Agentic Task Planning**: AI-powered maintenance scheduling and optimization

### 🛡️ GUARDIAN (Compliance Monitors)
- **Compliance Verification**: LLM-based analysis of reports against standards
- **Risk Assessment**: AI-powered compliance risk evaluation
- **Audit Automation**: Intelligent document generation and verification

### 🔮 MIRROR (Digital Twin Assistants)
- **Simulation Analysis**: LLM interpretation of digital twin results
- **Performance Optimization**: AI-powered workflow and process optimization
- **Scenario Planning**: Predictive modeling for "what-if" analysis

### 🚨 SIREN (Alerting APIs)
- **Intelligent Prioritization**: AI-powered alert ranking and routing
- **Context Analysis**: LLM analysis of alert context and severity
- **Remedial Recommendations**: Automated action suggestions for issue resolution

## 🎨 UI Components

The frontend includes comprehensive interfaces for all four intelligent agents:

### **Dashboard Layout**
- **Responsive Grid Design**: Modern, adaptive layout for all screen sizes
- **Agent Management**: Unified interface for all four intelligent agents
- **Real-time Updates**: Live data feeds and status monitoring

### **Data Visualization**
- **Interactive Charts**: Chart.js visualizations for sensor data and predictions
- **Status Cards**: Equipment health indicators with gradient backgrounds
- **Progress Tracking**: Real-time progress bars and health metrics

### **Agent-Specific Interfaces**
- **🦈 PREDATOR**: Equipment monitoring, RUL predictions, maintenance planning
- **🛡️ GUARDIAN**: Compliance dashboards, audit reports, risk assessments
- **🔮 MIRROR**: Digital twin visualizations, simulation results, performance analysis
- **🚨 SIREN**: Alert management, notification center, remedial action tracking

### **Modern UI Features**
- **Dark Theme**: Sophisticated dark color scheme with accent highlights
- **Animations**: Smooth transitions, hover effects, and micro-interactions
- **Responsive Design**: Mobile-first approach with adaptive layouts

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

### ✅ **COMPLETED - All Four Intelligent Agents**
- [x] **🦈 PREDATOR**: Maintenance Agents with predictive maintenance and agentic task planning
- [x] **🛡️ GUARDIAN**: Compliance Monitors with ISO verification and audit automation
- [x] **🔮 MIRROR**: Digital Twin Assistants with LLM interpretation and simulation analysis
- [x] **🚨 SIREN**: Alerting APIs with real-time notifications and AI-powered prioritization

### 🚧 **IN PROGRESS - Advanced Features**
- [ ] Enhanced LLM integration for deeper insights
- [ ] Advanced simulation engine capabilities
- [ ] Real-time IoT data integration
- [ ] Mobile application development

### 🔮 **FUTURE ROADMAP**
- [ ] Advanced ML model optimization
- [ ] API marketplace for third-party integrations
- [ ] Edge computing for local AI processing
- [ ] Blockchain integration for compliance records
- [ ] Advanced digital twin simulation capabilities
- [ ] Multi-tenant enterprise features

## 🙏 Acknowledgments

- NASA for the C-MAPSS dataset
- Google for Gemini Pro API
- Open source community for the amazing tools and libraries

---

**ORCA** - Making industrial operations smarter, safer, and more efficient through AI-powered insights.
