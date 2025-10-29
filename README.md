# 🟣 GitHub User Finder

A modern, fast, and responsive **GitHub User Finder** built with **React (Vite + TypeScript)** and **Material UI (MUI)**.  
Search any GitHub user, explore their profile, and browse repositories — all with caching, infinite scroll, and dark/light mode.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Material UI](https://img.shields.io/badge/MUI-Latest-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-Fast%20Builds-purple)

---

## ✨ Features

### 🧩 Core Features
- 🔍 **Real-time Debounced Search (500ms)** — reduces redundant API calls
- 👤 **User Profile** — avatar, name, bio, followers, following, public repo count
- 📦 **Repositories Grid** — responsive layout (3 / 2 / 1 columns)
- 🔄 **Infinite Scroll** — auto-load more repositories
- ⚠️ **Error & Empty States** — handles “Not Found”, rate limits, and no repo cases
- 💾 **LocalStorage Cache** — 30 min data persistence with TTL
- 🚫 **Cancelable Requests** — prevents memory leaks
- 🌓 **Dark / Light Mode Toggle** — user preference saved to `localStorage`

---

## 🎨 UI/UX Highlights

- 🪟 **MacOS-style Glassmorphism** on profile cards (backdrop blur)
- 🎨 **Custom Theme Colors**
  - Light: `#1049f1` (primary blue)
  - Dark: `#0c121c` (background)
- 💫 **Smooth Hover Animations** (`translateY(-8px)` on repo cards)
- 📱 **Responsive Grid Layout** (3 → 2 → 1 columns)
- 🔘 **Fixed Footer** with subtle elevation and credits
- 🧠 **Styled Components + MUI System** integration

---

## ⚙️ Technical Features

- ⚛️ **React Hooks** — `useReducer`, `useCallback`, `useRef`, `useMemo`
- 🗂️ **Context API** — centralized state for user & repos
- 🚀 **Axios** — API fetching with cancel tokens
- 🕒 **Debounce Hook** — optimized input handling
- 🧱 **Vite** — lightning-fast dev environment
- 🎯 **TypeScript** — full type safety
- 💾 **Local Cache Layer** — custom TTL-based storage

---

## 🏗️ Project Structure

src/
├── api/
│   └── github.ts          # Axios client + API helpers
├── assets/
│   └── notFound.png       # Error illustration
├── components/
│   ├── SearchBar.tsx      # Input with debounce
│   ├── ProfileCard.tsx    # User info with glass effect
│   ├── RepoItem.tsx       # Individual repo card
│   ├── RepoList.tsx       # Repo grid + infinite scroll
│   ├── ThemeToggle.tsx    # Dark/light switch
│   └── styles/            # Styled-components files
├── context/
│   ├── GithubProvider.tsx # Global context & reducer
│   └── types.ts           # State & action typings
├── hooks/
│   ├── useDebounce.ts     # Debounce logic
│   └── useInfiniteScroll.ts # Infinite scroll observer
├── utils/
│   └── cache.ts           # LocalStorage caching
├── theme/
│   └── theme.ts           # Light/dark MUI theme setup
├── App.tsx                # Main layout and logic
└── main.tsx               # Vite entry





---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+)
- **npm** (default)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/github-user-finder.git
cd github-user-finder

# Install dependencies
npm install

# Run development server
npm run dev

# localhost
http://localhost:5173



🔑 API Information

This project uses the public GitHub REST API:

User Profile → https://api.github.com/users/{username}

Repositories → https://api.github.com/users/{username}/repos

Add your github access token 
