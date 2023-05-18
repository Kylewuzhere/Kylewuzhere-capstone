import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }) {
  return (
    <main className="bg-grey-dark h-screen">
      <Header />
      {/* h-screen allows the background color: grey-dark to fully fill the background*/}
      <div className="w-screen grid grid-cols-12">
        <Sidebar />
        <div className="col-span-10 bg-grey-md flex justify-center items-center h-screen pb-48">{children}</div>
      </div>
    </main>
  );
}
