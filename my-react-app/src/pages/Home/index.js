import './Home.module.css';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Container from '../../components/Container';
import Cards from '../../components/Cards';
import Footer from '../../components/Footer';
import videos from '../../data/videos';

function Home() {
  return (
    <>
      <Header />
      <Banner />
      <main className="home">
        <Container title="Em destaque">
          <Cards videos={videos.featured} />
        </Container>

        <Container title="Recomendados para você">
          <Cards videos={videos.recommended} />
        </Container>

        <Container title="Mais para você">
          <Cards videos={videos.more} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Home;
