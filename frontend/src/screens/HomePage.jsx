import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-900 text-zinc-100">
      <div className="flex items-center gap-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} alt="Vite logo" className="w-24" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} alt="React logo" className="w-24" />
        </a>
      </div>

      <h1 className="text-4xl font-extrabold">Vite + React</h1>

      <button
        className="rounded bg-indigo-600 px-4 py-2 font-semibold hover:bg-indigo-500"
        onClick={() => setCount((c) => c + 1)}
      >
        count is {count}
      </button>

      <p className="text-sm text-zinc-400">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>
    </main>
  );
}

export default Home
