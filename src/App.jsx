import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import ArticlePage from "./pages/ArticlePage";
import ArticleCard from "./components/ArticleCard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path=":pid" element={<ArticleCard />} />
      </Routes>
    </>
  );
}

export default App;
