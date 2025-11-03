import { useState, useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

function App() {
  // 背景グラデーションと明るさ分類
  const gradients = {
    default: { bg: "linear-gradient(to right, #e2e2e2, #c9d6ff)", dark: false },
    blue: { bg: "linear-gradient(to right, #89f7fe, #66a6ff)", dark: false },
    pink: { bg: "linear-gradient(to right, #fbc2eb, #a6c1ee)", dark: false },
    green: { bg: "linear-gradient(to right, #d4fc79, #96e6a1)", dark: false },
    purple: { bg: "linear-gradient(to right, #a18cd1, #fbc2eb)", dark: false },
    dark: { bg: "linear-gradient(to right, #434343, #000000)", dark: true },
    midnight: { bg: "linear-gradient(to right, #232526, #414345)", dark: true },
    red: { bg: "linear-gradient(to right, #ff512f, #dd2476)", dark: false },
    ocean: { bg: "linear-gradient(to right, #2b5876, #4e4376)", dark: true },
  };

  const [selected, setSelected] = useState<keyof typeof gradients>("default");

  useEffect(() => {
    const current = gradients[selected];
    document.body.style.background = current.bg;
    document.body.style.transition = "background 0.6s ease";
    document.body.style.color = current.dark ? "#ffffff" : "#222222";
  }, [selected]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
      }}
    >
      <Header isDark={gradients[selected].dark} />
      <Body 
        selected={selected}
        onThemeChange={(theme) => setSelected(theme as keyof typeof gradients)}
      />
      <Footer isDark={gradients[selected].dark} />
    </div>
  );
}

export default App;
