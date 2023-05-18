import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";
export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {/* min-h-screen allows the background color: grey-dark to fully fill the background*/}
      <div className="flex flex-grow flex-col md:flex-row flex-1 bg-grey-dark min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-grey-dark">{children}</main>
      </div>
    </>
  );
}
