# DjisrUp | Connecting Visionaries with Capital

DjisrUp is a modern investment operating system tailored for the Algerian venture ecosystem. It bridges the gap between high-growth startups and accredited investors through AI-assisted verification, automated pitch generation, and secure deal rooms.

## 🚀 Vision
In a rapidly evolving market, transparency and efficiency are paramount. **DjisrUp** simplifies the due diligence process, allowing founders to focus on building and investors to focus on backing winners.

---

## ✨ Key Features

### 🏢 For Founders
- **Mission Control Dashboard**: A centralized hub to track startup metrics, manage funding requests, and view investor interest.
- **AI Pitch Studio**: Transform your raw pitch deck (PDF) into high-impact, structured slides with one click.
- **Onboarding & Verification**: Integrated upload for CNRC and Pitch Decks with AI-assisted profile verification.
- **Financial Data Room**: Securely share and update MRR, burn rate, and growth metrics.

### 💰 For Investors
- **Discovery Feed**: A curated list of live investment opportunities with AI-driven risk scoring (**Low**, **Medium**, **High**).
- **Deep-Dive Deal Rooms**: Access founder video pitches, AI-generated slide previews, and risk analysis summaries.
- **Allocation management**: Reserve allocations directly through the platform with dynamic term negotiation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion (Animations)
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI / Shadcn UI
- **Icons**: Lucide React

### Backend
- **Server**: Node.js & Express
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: Cloudinary (Media assets & PDFs)
- **Auth**: JWT (JSON Web Tokens) & Bcrypt

### AI Infrastructure
- **Framework**: FastAPI (Python)
- **OCR & Verification**: Custom CNRC (Commercial Register) verification logic.
- **Natural Language Processing**: PDF text extraction and prompt engineering for structured LLM output.
- **Risk Engine**: Multi-factor risk estimation based on sector, experience, and traction.

---

## 📂 Project Structure

```bash
├── frontend/          # React + Vite + TS Application
├── backend/           # Express.js Server & Prisma Models
├── backend/main.py    # FastAPI AI Service Entry Point
├── riskEstimator/     # Risk analysis logic
├── ocrCNRC/           # Document verification logic
└── generateSlides/    # PDF processing & Slide generation logic
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- Cloudinary Account
- Python 3.10+ (for AI services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayoub-ouazene/AI-HAKATHON.git
   cd AI-HAKATHON
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file based on example
   npx prisma migrate dev
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **AI Service Setup**
   ```bash
   cd riskEstimator
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

---

## 🎨 Branding
The project follows the **DjisrUp** design language: minimalist, high-contrast, and focused on clarity. Inspired by tools like Attio and Linear.

---

## 📄 License
This project is developed for the AI Hakathon 2026. All rights reserved.
