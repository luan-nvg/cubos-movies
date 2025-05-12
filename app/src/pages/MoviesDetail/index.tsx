import * as S from "./styles"
import ReactPlayer from "react-player/youtube"

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

const MoviePage = () => {
  return (
    <S.Container>
      <S.ContentWrapper>
        <S.TitleSection>
          <S.TitleWrapper>
            <S.MovieTitle>{movieData.title}</S.MovieTitle>
            <S.MovieOriginalTitle>
              {movieData.originalTitle}
            </S.MovieOriginalTitle>
          </S.TitleWrapper>

          <S.ButtonContainer>
            <S.FiltersButton onClick={() => {}}>Deletar</S.FiltersButton>
            <S.FiltersButton onClick={() => {}}>Editar</S.FiltersButton>
          </S.ButtonContainer>
        </S.TitleSection>

        <S.TwoColumnLayout>
          <S.Column>
            <S.ImageAndSynopsisContainer>
              <S.PosterContainer>
                <S.PosterImage
                  src={movieData.poster}
                  alt={`${movieData.title} Movie Poster`}
                />
              </S.PosterContainer>

              <S.SynopsisContainer>
                <S.Tagline>{movieData.tagline}</S.Tagline>
                <S.SynopsisItem>
                  <S.SynopsisTitle>SINOPSE</S.SynopsisTitle>
                  <S.SynopsisText>{movieData.synopsis}</S.SynopsisText>
                </S.SynopsisItem>

                <S.GenresContainer>
                  <S.GenresTitle>Gêneros</S.GenresTitle>
                  <S.GenresList>
                    {movieData.genres.map((genre, index) => (
                      <S.GenreTag key={index}>{genre}</S.GenreTag>
                    ))}
                  </S.GenresList>
                </S.GenresContainer>
              </S.SynopsisContainer>
            </S.ImageAndSynopsisContainer>
          </S.Column>

          <S.Column>
            <S.StatsRow>
              <S.StatBlock>
                <S.StatTitle>POPULARIDADE</S.StatTitle>
                <S.StatValue>{movieData.stats.popularidade}</S.StatValue>
              </S.StatBlock>

              <S.StatBlock>
                <S.StatTitle>VOTOS</S.StatTitle>
                <S.StatValue>{movieData.stats.votos}</S.StatValue>
              </S.StatBlock>

              <S.RatingCircle>
                {movieData.stats.rating}
                <span style={{ fontSize: "1rem" }}>%</span>
              </S.RatingCircle>
            </S.StatsRow>

            <S.StatsRow>
              <S.StatBlock>
                <S.StatTitle>LANÇAMENTO</S.StatTitle>
                <S.StatValue>{movieData.stats.lancamento}</S.StatValue>
              </S.StatBlock>

              <S.StatBlock>
                <S.StatTitle>DURAÇÃO</S.StatTitle>
                <S.StatValue>{movieData.stats.duracao}</S.StatValue>
              </S.StatBlock>
            </S.StatsRow>

            <S.StatsRow>
              <S.StatBlock>
                <S.StatTitle>SITUAÇÃO</S.StatTitle>
                <S.StatValue>{movieData.stats.situacao}</S.StatValue>
              </S.StatBlock>

              <S.StatBlock>
                <S.StatTitle>IDIOMA</S.StatTitle>
                <S.StatValue>{movieData.stats.idioma}</S.StatValue>
              </S.StatBlock>
            </S.StatsRow>

            <S.StatsRow>
              <S.StatBlock>
                <S.StatTitle>ORÇAMENTO</S.StatTitle>
                <S.StatValue>{movieData.stats.orcamento}</S.StatValue>
              </S.StatBlock>

              <S.StatBlock>
                <S.StatTitle>RECEITA</S.StatTitle>
                <S.StatValue>{movieData.stats.receita}</S.StatValue>
              </S.StatBlock>

              <S.StatBlock>
                <S.StatTitle>LUCRO</S.StatTitle>
                <S.StatValue>{movieData.stats.lucro}</S.StatValue>
              </S.StatBlock>
            </S.StatsRow>
          </S.Column>
        </S.TwoColumnLayout>

        <S.TrailerSection>
          <S.TrailerTitle>Trailer</S.TrailerTitle>
          <S.VideoContainer>
            <ReactPlayer
              url={movieData.trailer}
              width="100%"
              height="100%"
              controls
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </S.VideoContainer>
        </S.TrailerSection>
      </S.ContentWrapper>
    </S.Container>
  )
}

export default MoviePage
