import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";
export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {/* min-h-screen allows the background color: grey-dark to fully fill the background*/}
      <div className="flex flex-grow flex-col md:flex-row flex-1 bg-grey-dark min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <div className="flex justify-center grow-0 bg-grey-md m-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
