import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {/* h-screen allows the background color: grey-dark to fully fill the background*/}
      <Sidebar />
      <div className="bg-grey-md flex justify-center items-center h-screen ml-40">
        {children}
      </div>
    </>
  );
}
