import React from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import Row from "../components/Row";

export default function HomeScreen() {
  return (
    <div className="home-screen">
      <Nav />

      <Banner />

      <Row title="NETFLIX ORIGINALS" fetchUrl="fetchNetflixOriginals" isLargeRow={true} />
      <Row title="Tranding Now" fetchUrl="fetchTrending" />
      <Row title="Top Rated" fetchUrl="fetchTopRated"/>
      <Row title="Action Movies" fetchUrl="fetchActionMovies" />
      <Row title="Comedy Movies" fetchUrl="fetchComedyMovies" />
      <Row title="Horror Movies" fetchUrl="fetchHorrowMovies"/>
      <Row title="Romance Movies" fetchUrl="fetchRomanceMovies" />
      <Row title="Documentaries Movies" fetchUrl="fetchDocumentariesMovies" />
    </div>
  );
}
