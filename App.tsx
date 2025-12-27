import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CommandBar } from './components/CommandBar';
import { Home } from './pages/Home';
import { Detox } from './pages/Detox';
import { MealPlan } from './pages/MealPlan';
import { Legacy } from './pages/Legacy';
import { Quiz } from './pages/Quiz';
import { Admin } from './pages/Admin';

const App: React.FC = () => {
  return (
    <Router>
      {/* The Persistent HUD - Command Bar */}
      <CommandBar />

      <Routes>
        {/* Hub Page with Layout */}
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />

        {/* The Diagnostic Engine */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Sovereign Wellness Tools */}
        <Route path="/detox" element={<Detox />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/legacy" element={<Legacy />} />

        {/* Mission Control - Admin Dashboard */}
        <Route path="/admin" element={<Admin />} />

        {/* Placeholder for Blog */}
        <Route path="/blog" element={
          <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-solent mb-4">Island Insights</h1>
                <p className="text-gray-500">Coming Soon. Read about local AI adoption.</p>
              </div>
            </div>
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;