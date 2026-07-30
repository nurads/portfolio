import { useState } from "react";
import { Content, Theme } from "@carbon/react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/sections/Home";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { GitHubStats } from "./components/sections/GitHubStats";
import { Contact } from "./components/sections/Contact";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Theme theme="g100">
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div className={`app${isLoaded ? " app--ready" : ""}`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Content id="main-content" className="app__content">
          <Home />
          <About />
          <Projects />
          <GitHubStats />
          <Contact />
        </Content>
      </div>
    </Theme>
  );
}

export default App;
