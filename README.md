# AURA — Luxury Real Estate & Architectural Estates

A modern, high-end real estate web application built with an e-commerce shopping experience. It features responsive cards, interactive filters, quick-view modals, an interactive mortgage calculator, a shortlist / compare tool, and dedicated agent inquiry booking.

---

## 💻 Part 1: How to Save & Run This Locally on Your Computer

Follow these simple steps:

### 1. Requirements
Ensure you have **Node.js** installed on your computer. If you don't have it yet, download and install the LTS version from [https://nodejs.org](https://nodejs.org).

### 2. Download or Clone the Project
- If you downloaded the `.zip` file from Google AI Studio, unzip it into a folder (for example, `aura-real-estate` on your Desktop).
- Or clone it with Git:
  ```bash
  git clone <YOUR_REPOSITORY_URL>
  cd aura-real-estate
  ```

### 3. Open Terminal in the Project Folder
- **Mac / Linux:** Open **Terminal**, type `cd ` and drag the project folder into the terminal window, then press **Enter**.
- **Windows:** Open the folder in File Explorer, click the address bar, type `cmd` or `powershell`, and press **Enter**.

### 4. Install Dependencies
In your terminal, type:
```bash
npm install
```
This downloads all necessary libraries (React, Tailwind CSS, Lucide Icons, Vite).

### 5. Start the Development Server
```bash
npm run dev
```

### 6. View the Website
Open your browser (Chrome, Edge, Safari, Firefox) and go to:
```
http://localhost:3000
```
Your luxury real estate website is now running locally on your computer!

---

## 🚀 Part 2: How to Deploy on Vercel (Free 1-Click Hosting)

Vercel provides free, high-speed hosting with automatic SSL (https).

### Step 1: Push your code to GitHub
1. Go to [https://github.com](https://github.com) and create a new repository called `aura-real-estate`.
2. In your terminal, run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of AURA luxury real estate"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aura-real-estate.git
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign up or log in using your GitHub account.
2. Click **Add New...** -> **Project**.
3. Locate your `aura-real-estate` repository in the list and click **Import**.

### Step 3: Deploy
1. Vercel automatically detects **Vite** as the framework preset:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
2. Click **Deploy**.
3. In under 60 seconds, your site is live with a permanent public link (e.g., `https://aura-real-estate.vercel.app`)!

---

## 🏛️ Features Included

1. **E-Commerce Real Estate Catalog:**
   - Property cards with high-impact architectural photography.
   - Dynamic filtering by listing type (Buy / Rent), style (Villas, Penthouses, Waterfront Estates, Modernist Glass Pavilions, Historic Lofts), price slider, bedrooms, bathrooms, and luxury amenities.
   - Sort by Featured, Price (Low to High / High to Low), Square Footage, and Newest.
   - Grid and list view switchers.

2. **Interactive Property PDP (Product Detail Page):**
   - High-resolution photo gallery with thumbnail selector.
   - Architectural metrics (beds, baths, square feet, lot dimension, year built, garage spaces, price per sq ft).
   - Contiguous purchase/inquiry module with dedicated representative broker profile.
   - In-person and 3D virtual tour scheduling modal.

3. **Financial Modeler & Mortgage Calculator:**
   - Real-time monthly payment calculator.
   - Live adjustments for home price, down payment percentage, interest rate, loan term, HOA dues, and property taxes.
   - Visual colored breakdown bar for Principal & Interest, Property Taxes, Insurance, and HOA.

4. **E-Commerce Shortlist & Side-by-Side Comparison:**
   - Persistent Shortlist drawer (saved across browser refreshes).
   - Side-by-side comparison modal analyzing 2 to 3 properties across specs and amenities.
   - Bulk inquiry action.

5. **Agent Advisory & Contact Form:**
   - Comprehensive multi-tier inquiry form (buying, selling, leasing, architectural appraisals).
   - Broker directory with licenses, career volume, direct phone/email.
   - Atelier office addresses in Beverly Hills, Manhattan, and Miami Beach.
