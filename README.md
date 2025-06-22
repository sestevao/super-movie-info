# Create README.md content and save as a file

readme_content = """
# 🎬 Super API Movie App

A fun, interactive movie information app built with **Next.js 14**, **TypeScript**, and **TailwindCSS**.
It fetches movie data, fun facts, and even a "Word of the Day" from a custom API! Users can search for movies, view detailed info, and add favorites to local storage.

---

## 🚀 Features

- 🔍 **Movie Search:** Search any movie by title.
- 🎲 **Random Movie Picker:** Auto-fetch a random popular movie if no title is entered.
- ❤️ **Favorite Movies:** Save favorite movies to local storage.
- 🌓 **Dark/Light Mode Toggle**
- 📝 **Word of the Day** and **Fun Fact** per movie.
- 🎨 Styled using TailwindCSS and custom components.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Hooks (useState, useEffect)
- **Persistence:** Browser LocalStorage

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/super-api-movie.git
cd super-api-movie

# Install dependencies
npm install

# Run the development server
npm run dev
```

## 🗂️ Project Structure

```
src/
  ├── app/
  │     └── page.tsx          # Main App Page
  ├── components/
  │     └── ui/               # UI components (Card, CardHeader, etc.)
  └── pages/api/super-movie.ts # API route for fetching movie data
```


## ⚙️ API Endpoint

Custom API route at:

```/api/super-movie?title=MovieName```

It returns:

```
{
  "title": "Inception",
  "year": "2010",
  "poster": "...",
  "director": "Christopher Nolan",
  "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "..."],
  "plot": "...",
  "rating": "8.8",
  "funFact": "Did you know...",
  "wordOfTheDay": {
    "word": "Dreamscape",
    "meaning": "A landscape or scene with dream-like qualities.",
    "example": "The film creates a dreamscape that blurs reality and fantasy."
  }
}
```

## 🌟 Features in Detail

- Search Functionality: Enter any movie title to fetch details.
- Random Movie Fallback: If search is empty, a random title from the preset list is used.
- Local Storage Favorites: Your favorite movies persist across sessions.
- Dark Mode Toggle: Instantly switch between light and dark themes.

## 🐛 Known Issues

API Rate Limit: Might receive 429 errors when requests are too frequent.

## 🙌 Contributing

Feel free to fork and submit PRs!
Please open issues for bugs or feature requests.

## 📄 License
MIT License

