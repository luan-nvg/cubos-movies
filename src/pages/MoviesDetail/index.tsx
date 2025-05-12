// MoviePage.tsx
import React from "react"
import styled from "styled-components"
import ReactPlayer from "react-player/youtube"

// Movie data in JSON format for easy API integration
const movieData = {
  title: "Bumblebee",
  originalTitle: "Transformers: Bumblebee",
  tagline: "Todo herio tem um começo.",
  synopsis:
    '"Bumblebee" é um filme que se passa em 1987 e acompanha a jornada do Transformer Bumblebee que encontra refúgio em um ferro- velho de uma pequena cidade costeira da Califórnia. Charlie, uma adolescente prestes a completar 18 anos, encontra Bumblebee danificado e sem condições de uso. Quando ela o coloca novamente em funcionamento, logo percebe que este não é um carro amarelo fusca anormal. O filme é uma mistura de drama/ação e ficção científica, em bom estilo anos 80, com flashbacks dos anos 40 e nos anos 80 é para trilha sonora perfeita.',
  genres: ["AÇÃO", "AVENTURA", "FICÇÃO CIENTÍFICA"],
  poster:
    "https://upload.wikimedia.org/wikipedia/pt/4/44/Bumblebee_%282018%29.jpg",
  trailer: "https://www.youtube.com/watch?v=lcwmDAYt22k",
  stats: {
    popularidade: "42.599",
    votos: "9784",
    rating: "67",
    lancamento: "12/09/2018",
    duracao: "1h 53m",
    situacao: "Lançado",
    idioma: "Inglês",
    orcamento: "$135M",
    receita: "$467.99M",
    lucro: "$332.99M"
  }
}

// Styled Components
const Container = styled.div`
  /* background-color: #000000; */
  color: #ffffff;
  font-family: sans-serif;
  min-height: 100vh;
`

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`

const TitleSection = styled.div`
  margin-bottom: 2rem;
`

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`

const MovieOriginalTitle = styled.h2`
  font-size: 1.2rem;
  color: #aaaaaa;
  font-weight: normal;
  margin-top: 0;
`

// Two Column Layout Components
const TwoColumnLayout = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const ImageAndSynopsisContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const PosterContainer = styled.div`
  flex: 0 0 auto;
  width: 180px;
`

const PosterImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`

const SynopsisContainer = styled.div`
  flex: 1;
`

const Tagline = styled.p`
  color: #aaaaaa;
  font-style: italic;
  margin-bottom: 1.9rem;
  margin-top: 1.9rem;
`

const SynopsisTitle = styled.h3`
  font-size: 1rem;
  color: #aaaaaa;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`

const SynopsisText = styled.p`
  line-height: 1.5;
`

const GenresContainer = styled.div`
  margin-top: 1.5rem;
`

const GenresTitle = styled.h3`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-bottom: 0.5rem;
`

const GenresList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const GenreTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  text-transform: uppercase;
  background-color: var(--secondary-fix);
`

// Stats Components
const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const StatBlock = styled.div`
  margin-bottom: 1rem;
  flex: 1 0 auto;
`

const StatTitle = styled.h4`
  font-size: 0.8rem;
  color: #aaaaaa;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`

const StatValue = styled.div`
  font-size: 0.9rem;
`

const RatingCircle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #ffd700;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const TrailerSection = styled.div`
  margin-top: 2rem;
`

const TrailerTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background-color: #111;
  border-radius: 8px;
  overflow: hidden;
`

const MoviePage = () => {
  return (
    <Container>
      <ContentWrapper>
        {/* Title Section */}
        <TitleSection>
          <MovieTitle>{movieData.title}</MovieTitle>
          <MovieOriginalTitle>{movieData.originalTitle}</MovieOriginalTitle>
        </TitleSection>

        {/* Two column layout */}
        <TwoColumnLayout>
          {/* Column 1: Poster, Synopsis and Genres (50%) */}
          <Column>
            {/* Row 1: Tagline - Aligns with the stats in column 2 */}

            {/* Image and Synopsis side by side */}
            <ImageAndSynopsisContainer>
              <PosterContainer>
                <PosterImage
                  src={movieData.poster}
                  alt={`${movieData.title} Movie Poster`}
                />
              </PosterContainer>

              <SynopsisContainer>
                <Tagline>{movieData.tagline}</Tagline>
                <SynopsisTitle>SINOPSE</SynopsisTitle>
                <SynopsisText>{movieData.synopsis}</SynopsisText>
                <GenresContainer>
                  <GenresTitle>Gêneros</GenresTitle>
                  <GenresList>
                    {movieData.genres.map((genre, index) => (
                      <GenreTag key={index}>{genre}</GenreTag>
                    ))}
                  </GenresList>
                </GenresContainer>
              </SynopsisContainer>
            </ImageAndSynopsisContainer>
          </Column>

          {/* Column 2: Stats arranged in rows (50%) */}
          <Column>
            {/* Row 1: Tagline level stats */}
            <StatsRow>
              <StatBlock>
                <StatTitle>POPULARIDADE</StatTitle>
                <StatValue>{movieData.stats.popularidade}</StatValue>
              </StatBlock>

              <StatBlock>
                <StatTitle>VOTOS</StatTitle>
                <StatValue>{movieData.stats.votos}</StatValue>
              </StatBlock>

              <RatingCircle>
                {movieData.stats.rating}
                <span style={{ fontSize: "1rem" }}>%</span>
              </RatingCircle>
            </StatsRow>

            {/* Row 2: Lançamento e Duração */}
            <StatsRow>
              <StatBlock>
                <StatTitle>LANÇAMENTO</StatTitle>
                <StatValue>{movieData.stats.lancamento}</StatValue>
              </StatBlock>

              <StatBlock>
                <StatTitle>DURAÇÃO</StatTitle>
                <StatValue>{movieData.stats.duracao}</StatValue>
              </StatBlock>
            </StatsRow>

            {/* Row 3: Situação e Idioma */}
            <StatsRow>
              <StatBlock>
                <StatTitle>SITUAÇÃO</StatTitle>
                <StatValue>{movieData.stats.situacao}</StatValue>
              </StatBlock>

              <StatBlock>
                <StatTitle>IDIOMA</StatTitle>
                <StatValue>{movieData.stats.idioma}</StatValue>
              </StatBlock>
            </StatsRow>

            {/* Row 4: Orçamento, Receita e Lucro */}
            <StatsRow>
              <StatBlock>
                <StatTitle>ORÇAMENTO</StatTitle>
                <StatValue>{movieData.stats.orcamento}</StatValue>
              </StatBlock>

              <StatBlock>
                <StatTitle>RECEITA</StatTitle>
                <StatValue>{movieData.stats.receita}</StatValue>
              </StatBlock>

              <StatBlock>
                <StatTitle>LUCRO</StatTitle>
                <StatValue>{movieData.stats.lucro}</StatValue>
              </StatBlock>
            </StatsRow>
          </Column>
        </TwoColumnLayout>

        {/* Trailer section */}
        <TrailerSection>
          <TrailerTitle>Trailer</TrailerTitle>
          <VideoContainer>
            <ReactPlayer
              url={movieData.trailer}
              width="100%"
              height="100%"
              controls
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </VideoContainer>
        </TrailerSection>
      </ContentWrapper>
    </Container>
  )
}

export default MoviePage
