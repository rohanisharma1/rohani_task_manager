import TrelloBoard from "../components/TaskBoard ";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="space-y-8">
      <TrelloBoard />
      <Footer />
    </div>
  );
};
export default Home;
