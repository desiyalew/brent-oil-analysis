# 🛢️ Brent Oil Price Change Point Analysis

> **Detecting Structural Breaks in Oil Markets Using Bayesian Inference**

This project analyzes structural breaks in **Brent crude oil prices (1987–2022)** using **Bayesian change point detection** with **PyMC3**. The goal is to identify how major **geopolitical events, economic crises, and OPEC decisions** have statistically impacted oil price behavior over time.

We combine **statistical modeling**, **historical event correlation**, and **interactive visualization** to deliver actionable insights for investors, policymakers, and energy sector stakeholders.

---

## 🎯 Business Objective

- Detect **significant structural breaks** in Brent oil prices.
- Associate detected change points with **real-world events** (e.g., wars, sanctions, OPEC policy shifts).
- Quantify the **impact of events** on price mean and volatility.
- Deliver insights via a **Flask + React interactive dashboard** and a **blog-style report**.

---

## 📂 Project Structure
brent-oil-analysis/
│
├── data/
│ ├── raw/
│ │ └── BrentOilPrices.csv
│ └── processed/
│ ├── oil_events.csv
│ └── cleaned_brent_data.csv
│
├── notebooks/
│ ├── eda_and_data_cleaning.ipynb
│ ├── change_point_modeling.ipynb
│ └── model_interpretation.ipynb
│
├── src/
│ ├── data/
│ │ ├── load_data.py
│ │ └── clean_data.py
│ ├── models/
│ │ ├── change_point_model.py
│ │ └── utils.py
│ └── visualization/
│ └── plots.py
│
├── app/
├── dashboard/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── services/api.js
│ │ └── App.js
│ └── package.json
├── requirements.txt
├── README.md
└── .gitignore


---

## 🧪 Core Analysis Workflow

1. **Data Loading & Cleaning**: Parse `BrentOilPrices.csv`, handle date formatting, compute log returns.
2. **Exploratory Data Analysis (EDA)**: Visualize price trends, volatility clustering, and stationarity.
3. **Event Compilation**: 15 key events (e.g., Gulf War, OPEC cuts, Russia-Ukraine war) linked to price shifts.
4. **Bayesian Change Point Model**: Built using **PyMC3** to estimate posterior distribution of change points.
5. **Interpretation**: Compare model outputs with historical events; quantify impact (e.g., "Price dropped 40% post-Lehman collapse").
6. **Dashboard**: Interactive Flask (backend) + React (frontend) app for stakeholder exploration.
