import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "@/routes/AppRoutes";


function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen px-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
}

export default App;
