import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import ArticlePage from "./pages/ArticlePage";
import ArticleCard from "./components/ArticleCard";
import { UserProvider } from "./components/User";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/articles/:id" element={<ArticleCard />} />
        <Route path="/topics/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
