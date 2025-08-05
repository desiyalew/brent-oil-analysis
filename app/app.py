# app/app.py
from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

# Fix path: go up one level from 'app/' to reach 'dashboard_data/'
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, '..', 'dashboard_data')

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    print(f"🔍 Loading: {path}")  # Debug
    if not os.path.exists(path):
        raise FileNotFoundError(f"File not found: {path}")
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/api/prices')
def get_prices():
    try:
        return jsonify(load_json('prices.json'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/events')
def get_events():
    try:
        return jsonify(load_json('events.json'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/change_points')
def get_change_points():
    try:
        return jsonify(load_json('change_points.json'))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/summary')
def get_summary():
    try:
        prices = load_json('prices.json')
        events = load_json('events.json')
        change_points = load_json('change_points.json')
        return jsonify({
            "total_days": len(prices),
            "first_price": prices[0]["Price"],
            "last_price": prices[-1]["Price"],
            "min_price": min(p["Price"] for p in prices),
            "max_price": max(p["Price"] for p in prices),
            "num_events": len(events),
            "num_change_points": len(change_points)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print(f"📁 DATA_DIR: {DATA_DIR}")
    print(f"📄 Files: {os.listdir(DATA_DIR) if os.path.exists(DATA_DIR) else 'Not found'}")
    app.run(debug=True, port=5000)