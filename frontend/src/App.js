import React from "react";
import { Routes, Route } from 'react-router-dom';
import { SinglePlayerGame } from "./pages/SinglePlayerGame";
import { PlayerProfile } from "./pages/PlayerProfile";
import { AllGames } from "./pages/AllGames";
import { NavigationBar } from "./components/Navbar";
import { MultiplayerGame } from "./pages/MultiplayerGame";
import { SignIn } from "../src/pages/SignIn";
import { SignUp } from "../src/pages/SignUp";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
          <Route path="/player-profile" element={<PlayerProfile />} />
          <Route path="/games" element={<AllGames />} />
          <Route path="/single-player-game" element={<SinglePlayerGame />} />
          <Route path="/multi-player-game" element={<MultiplayerGame/>} />
          <Route path="/sign-in-page" element={<SignIn />} />
          <Route path="/sign-up-page" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
