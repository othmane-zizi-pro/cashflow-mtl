# CashFlow MTL - Montreal Real Estate Investment Analyzer

An AI-powered web application that analyzes Montreal real estate investment opportunities by combining Centris listings with ML-powered Airbnb revenue forecasts.

## Features

- 🤖 **AI-Powered Revenue Predictions** - Random Forest model trained on 8,500+ real Montreal Airbnb listings
- 📊 **Comprehensive Investment Metrics** - Cash-on-Cash Return, Cap Rate, Monthly Cashflow, and 5-year projections
- 📄 **Bank-Ready Business Plans** - Downloadable PDF reports with detailed financial analysis
- 🏠 **Real Centris Integration** - Add and analyze real properties from Centris.ca
- 📈 **Interactive Dashboard** - Beautiful UI with sortable metrics and property comparison

## Tech Stack

### Frontend
- React 18
- React Router
- CSS3 with modern animations
- Responsive design

### Backend
- Python 3.9+
- Flask with CORS support
- scikit-learn (Random Forest Regression)
- pandas & numpy for data processing
- Selenium for web scraping
- Beautiful Soup for HTML parsing

### Machine Learning
- **Model**: Random Forest Regression
- **Training Data**: 8,518 Montreal Airbnb listings
- **Features**: Location (lat/long), bedrooms, bathrooms, square footage
- **Performance**: R² = 0.63, MAE = $486.39/month

## Quick Start

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs on `http://localhost:5001`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## Deployment

### Deploy to Railway (Recommended)

Railway is perfect for this full-stack Python ML app with no size limits.

1. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `othmane-zizi-pro/cashflow-mtl`

3. **Configure Deployment**
   - Railway will auto-detect the configuration from `Procfile`
   - Set the start command: `cd backend && gunicorn app:app`
   - Add environment variables if needed (optional)

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.railway.app`
   - Build takes 3-5 minutes

### Environment Variables

The app works out of the box with sample data. Optional configuration in Railway:

```env
APIFY_API_TOKEN=your_token_here  # Optional: For real-time Centris scraping
PORT=5001                         # Railway will set this automatically
FLASK_ENV=production
```

### Why Not Vercel?

Vercel has a 250 MB limit for serverless functions. This app's Python backend with scikit-learn, pandas, and the ML model exceeds that limit. Railway has no such limitations and is better suited for full-stack Python ML applications.

## Project Structure

```
airbnb_project/
├── backend/
│   ├── app.py                 # Flask API server
│   ├── property_analyzer.py   # Core analysis logic
│   ├── property_storage.py    # JSON-based storage
│   ├── requirements.txt       # Python dependencies
│   ├── data/
│   │   ├── properties.json    # Property storage
│   │   └── cleaned_airbnb_montreal_with_sqft_and_coords.csv
│   └── models/
│       └── airbnb_revenue_model.pkl
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/            # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── Procfile                  # Railway deployment config
├── railway.json              # Railway configuration
├── .gitignore
└── README.md
```

## Investment Metrics Explained

### Cash-on-Cash Return
Annual net cashflow divided by total initial investment (down payment + closing costs).

**Formula**: `(Annual Cashflow / Total Initial Investment) × 100`

### Cap Rate (Capitalization Rate)
Net operating income divided by property value (excludes mortgage payments).

**Formula**: `(Annual NOI / Property Value) × 100`

### Monthly Cashflow
Revenue minus all expenses including mortgage, taxes, insurance, maintenance, and vacancy.

**Formula**: `Monthly Revenue - (Mortgage + Property Tax + Insurance + Maintenance + HOA + Vacancy Reserve)`

### Key Assumptions
- **Down Payment**: 20% for properties under $1M, 25% for over $1M
- **Interest Rate**: 5.5%
- **Mortgage Term**: 25 years
- **Property Tax**: 1.2% annually
- **Insurance**: $100/month
- **Maintenance**: 1% of property value annually
- **Vacancy Rate**: 15%
- **Airbnb Occupancy**: 65%

For full technical details, see the **Technical Guide** page in the app.

## Data Sources

- **Inside Airbnb**: Historical Montreal Airbnb data (8,518 listings from 2023)
- **Centris**: Real-time Montreal real estate listings
- **Machine Learning**: Scikit-learn Random Forest model

## API Endpoints

### POST `/api/analyze`
Analyze properties with investment metrics
```json
{
  "use_sample": true,
  "use_stored": true,
  "max_listings": 15
}
```

### POST `/api/admin/properties`
Add a new Centris property
```json
{
  "centris_id": "26692415",
  "address": "109, Rue Charlotte, apt. 303",
  "price": 349000,
  "bedrooms": 1,
  "bathrooms": 1,
  "sqft": 600,
  "url": "https://www.centris.ca/...",
  "latitude": 45.5017,
  "longitude": -73.5673
}
```

### GET `/api/admin/stats`
Get property count statistics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contact

**Othmane Zizi**
- Email: othmane.zizi.pro@gmail.com
- Location: Montreal, Quebec, Canada

## Disclaimer

This tool provides investment analysis for informational purposes only. It is not financial advice, legal advice, or a substitute for professional consultation. All financial projections are estimates based on historical data and may not reflect actual results. Real estate investing carries inherent risks. Users should conduct their own due diligence and consult with qualified professionals before making investment decisions.

---

**Built with ❤️ in Montreal**
