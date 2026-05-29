export default function DumbledorePortraitApp() {
  const PASSWORD = "phoenix";

  const quotes = [
    "It is our choices that show what we truly are.",
    "Even in darkness, a light may still be found.",
    "Wisdom begins when pride grows quiet.",
    "Courage is often gentle, not loud."
  ];

  const advice = [
    "You need not solve everything tonight.",
    "The difficult path is not always the wrong one.",
    "Do not measure yourself only by your failures.",
    "A troubled mind still deserves hope."
  ];

  const randomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const randomAdvice = () => {
    return advice[Math.floor(Math.random() * advice.length)];
  };

  const [message, setMessage] = React.useState(
    () => localStorage.getItem("portraitMessage") || randomQuote()
  );

  const [input, setInput] = React.useState("");
  const [glow, setGlow] = React.useState(false);
  const [unlocked, setUnlocked] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const [history, setHistory] = React.useState(() => {
    const saved = localStorage.getItem("portraitHistory");
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("portraitHistory", JSON.stringify(history));
    localStorage.setItem("portraitMessage", message);
  }, [history, message]);

  const askPortrait = () => {
    setGlow(true);

    setTimeout(() => {
      if (input.trim()) {
        const response = randomAdvice();

        setMessage(response);

        setHistory((prev) => [
          ...prev,
          {
            question: input,
            answer: response
          }
        ]);
      } else {
        setMessage(randomQuote());
      }

      setGlow(false);
    }, 900);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 text-yellow-100">
        <div className="w-full max-w-md bg-yellow-950/30 border border-yellow-700 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl text-center mb-4">
            Headmaster Portrait
          </h1>

          <p className="text-center mb-6">
            Enter the password to awaken the portrait.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl bg-black border border-yellow-700 p-4 mb-4"
          />

          <button
            onClick={() => {
              if (password === PASSWORD) {
                setUnlocked(true);
              } else {
                alert("The portrait remains silent...");
              }
            }}
            className="w-full py-3 rounded-xl bg-yellow-700 text-black"
          >
            Enter
          </button>

          <div className="text-center text-xs mt-4">
            Default password: phoenix
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 text-yellow-100 p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        <div className="flex justify-center">
          <div className={`transition-all duration-700 ${glow ? "scale-105" : ""}`}>
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
              alt="Portrait"
              className={`w-[320px] h-[460px] object-cover rounded-3xl border-8 border-yellow-800 ${glow ? "brightness-125" : "brightness-90"}`}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl">
            Living Portrait Advisor
          </h1>

          <div className="bg-yellow-950/40 border border-yellow-800 rounded-3xl p-6">
            <p className="text-2xl italic">
              “{message}”
            </p>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell the portrait what troubles your heart..."
            className="w-full h-32 rounded-2xl bg-black border border-yellow-700 p-4"
          />

          <div className="flex gap-3">
            <button
              onClick={askPortrait}
              className="px-6 py-3 rounded-2xl bg-yellow-700 text-black"
            >
              Ask the Portrait
            </button>

            <button
              onClick={() => {
                setInput("");
                setMessage(randomQuote());
              }}
              className="px-6 py-3 rounded-2xl border border-yellow-700"
            >
              New Wisdom
            </button>
          </div>

          <div className="bg-black/30 border border-yellow-800 rounded-3xl p-4 max-h-48 overflow-y-auto">
            <div className="font-semibold mb-2">
              Portrait Memory
            </div>

            {history.length === 0 ? (
              <div>No memories yet...</div>
            ) : (
              history
                .slice()
                .reverse()
                .map((item, index) => (
                  <div key={index} className="mb-3">
                    <div>You: {item.question}</div>
                    <div className="italic">
                      Portrait: {item.answer}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
