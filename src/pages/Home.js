import Avis from '../components/Avis';
import Features from '../components/Features';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Up from '../components/Up';
import Navbar from '../layouts/Navbar';


function Home() {
  return (
    <>
    
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Avis />
      <Footer />
      <Up />
    </>
  );
}

export default Home;
