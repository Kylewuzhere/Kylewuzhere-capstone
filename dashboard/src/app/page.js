import Header from './components/Header'

export default function Home() {
  return (
    <div>
      <Header />
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-serif font-bold">Dashboard</h1>
    </main>
    </div>
  );
}
