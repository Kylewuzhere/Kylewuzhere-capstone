export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-grey-dark p-24">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <button className="text-white bg-orange py-2 mr-4 px-4 rounded">
          LOGIN
        </button>
      </div>
    </main>
  );
}
