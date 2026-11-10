# 🌤️ CampusBreeze — Campus Outdoor Comfort & Weather Dashboard

> A soft, cute, aesthetic React web application designed for college students to effortlessly find comfortable outdoor spaces during **extreme heat, sudden rain, or peak sunshine**.

Built with **React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Canvas-Confetti**.

---

## 🌟 Why CampusBreeze?
College students often struggle to locate comfortable outdoor study and relaxation spots on campus during extreme weather conditions:
- **During Extreme Heatwaves (35°C+ / High UV):** Exposed lawns bake students and overheat laptops. Students need deeply shaded gothic cloisters, high-canopy willow groves, or automated ultrasonic misting pergolas with chilled water refill stations.
- **During Sudden Rainstorms & Drizzles:** Outdoor tables soak through. Students need 100% waterproof cantilever roofs and glass pavilions with dry seating and charging ports.

**CampusBreeze** solves this by calculating real-time **Microclimate Comfort Scores** for outdoor spaces, providing interactive campus maps, hourly solar shade tracking, and crowdsourced live student reports!

---

## ✨ Key Features

### 1. 🌡️ Dynamic Weather Engine & Simulation Bar
- **Real-time Metrics:** Displays Ambient Temperature, Perceived "Feels Like" Temperature, Humidity, UV Index, Wind/Breeze, and Precipitation Likelihood.
- **Dynamic Outdoor Comfort Score (OCI):** Recalculates match percentages for every outdoor space on the fly.
- **Weather Scenario Simulator:** Directly toggle between:
  - ☀️ **Scorching Heatwave (35°C, UV 9, Feels 40°C)**
  - ⛈️ **Torrential Rainstorm (20°C, 95% Rain, 100% Dry Roofs required)**
  - 🌦️ **Cozy Passing Drizzle (22°C, 60% Rain, Botanical Trellises)**
  - 🍃 **Golden Hour Breeze (24°C, Weather Perfection)**
  - 🌤️ **Crisp Morning Sun (18°C, Gentle Sunlit Lawns)**

### 2. ☁️ "Breezy the Campus Cloud" Mascot
- Cute animated cloud mascot offering contextual student wellness advice (e.g. hydration alerts, misting fan status, sunscreen warnings).

### 3. 🗺️ Interactive Campus Comfort Map
- Illustrated SVG campus map showcasing **North Academic Quad**, **South Lake Claire**, **Innovation Courtyard**, and **Central Botanical Gardens**.
- Interactive comfort pins color-coded by comfort status (🟢 90%+ Comfort, 🟡 Fair, 🔴 Exposed).
- Click-to-preview tooltip with live shade ratings and microclimate metrics.

### 4. 🎴 Rich Space Cards & Microclimate Thermometer
- Detailed outdoor spaces:
  1. *Old Main Library Cloister & Portico* (Limestone arches, -5°C cooler, 100% rainproof, 12 plugs)
  2. *Ancient Willow Grove & Hammock Lawn* (Lake micro-breezes, 90% shade, hammocks)
  3. *Innovation Pergola & Misting Terrace* (Active ultrasonic misting fans, solar USB-C hubs)
  4. *Conservatory Glass Pavilion & Trellis* (Polycarbonate rainproof roof, fragrant jasmine)
  5. *Student Union Solar Terrace & Cafe Porch* (Tensile sail shades, boba cafe nearby)
  6. *Arts Quad Overhang & Acoustic Bowl* (Cantilever overhang, beanbags, rain shelter)
  7. *South Shore Victoria Gazebo* (Water lilies, quiet rain watching)
  8. *Old Oak Sunken Reading Garden* (Depression microclimate, ivy banks)

### 5. 🕒 Hourly Shade & Solar Shift Timeline
- Helps students plan their study sessions by predicting solar ray angles and tree canopy shadow shifts from 9:00 AM to 6:00 PM.

### 6. 🎒 "Find My Comfort Spot" 30-Second Quiz
- Step-by-step interactive quiz tailored to whether you're studying on a laptop, reading a book, taking a power nap, or meeting friends! Includes celebratory confetti.

### 7. 📢 Crowdsourced Live Student Feed & Status Reporter
- Students can broadcast live updates from their location (crowd status, misting fan status, dry seats).
- Stored locally in `localStorage`.

### 8. ❤️ Saved Nooks Drawer
- Slide-out bookmark drawer allowing students to save their favorite outdoor study spots.

---

## 🎨 Design & Aesthetic
- **Color Palette:** Soft pastel blossom pinks, lavender mist, mint sage, sky blues, and warm creams.
- **Typography:** Soft, playful, and rounded (`Quicksand` & `Plus Jakarta Sans`).
- **Micro-Interactions:** Gentle floating animations, button bounce, and celebratory confetti upon claiming a spot.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v25)
- npm or pnpm

### Installation
```bash
# Clone or navigate into project directory
cd CampusWeather

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```
Open `http://localhost:3000` or the port shown in your terminal!

---

## 📦 Production Build & Deployment

To generate a standalone production build:
```bash
npm run build
```
The optimized production bundle will be created in the `/dist` directory.

### 1-Click Deploy to Vercel:
```bash
npm i -g vercel
vercel
```

### 1-Click Deploy to Netlify:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 📄 License
MIT © CampusBreeze Team

