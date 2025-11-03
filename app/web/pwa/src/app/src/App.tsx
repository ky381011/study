import { useState, useEffect } from "react";

function App() {
  const gradients = {
    default: "linear-gradient(to right, #e2e2e2, #c9d6ff)",
    blue: "linear-gradient(to right, #89f7fe, #66a6ff)",
    pink: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    green: "linear-gradient(to right, #d4fc79, #96e6a1)",
    purple: "linear-gradient(to right, #a18cd1, #fbc2eb)",
    dark: "linear-gradient(to right, #434343, #000000)"
  };

  const [bg, setBg] = useState<keyof typeof gradients>("default");

  useEffect(() => {
    document.body.style.background = gradients[bg];
    document.body.style.transition = "background 0.5s ease";
  }, [bg]);

  return (
    <div
      style={{
        textAlign: "center",
        color: "#333",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>背景グラデーション変更</h1>
      <select
        value={bg}
        onChange={(e) => setBg(e.target.value as keyof typeof gradients)}
        style={{
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "1rem",
        }}
      >
        <option value="default">デフォルト</option>
        <option value="blue">ブルー</option>
        <option value="pink">ピンク</option>
        <option value="green">グリーン</option>
        <option value="purple">パープル</option>
        <option value="dark">ダーク</option>
      </select>
    </div>
  );
}

export default App;
