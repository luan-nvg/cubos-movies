import { useNavigate } from "react-router-dom"
import * as S from "./styles"

const Movies = ({ movies, ...rest }) => {
  const navigate = useNavigate()

  const handleMovieClick = movieId => {
    // Navega para a página de detalhes passando o ID do filme
    navigate(`/movies-detail/${movieId}`)
  }

  return (
    <S.MoviesGrid {...rest}>
      {movies.map(movie => (
        <S.MovieCard
          key={movie.id}
          onClick={() => handleMovieClick(movie.id)}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <S.MoviePoster>
            <S.RatingCircle>
              <S.ProgressSvg viewBox="0 0 36 36">
                <S.CircleBackground cx="18" cy="18" r="16" />
                <S.CircleProgress
                  cx="18"
                  cy="18"
                  r="16"
                  rating={movie.rating}
                  strokeDasharray="100"
                  strokeDashoffset={100 - movie.rating}
                />
              </S.ProgressSvg>
              <S.RatingValueContainer>
                <S.RatingNumber rating={movie.rating}>
                  {movie.rating}
                </S.RatingNumber>
                <S.RatingPercent>%</S.RatingPercent>
              </S.RatingValueContainer>
            </S.RatingCircle>

            <S.PosterImage src={movie.image} alt={movie.title} />

            <S.MovieInfoOverlay>
              <S.OverlayTitle>{movie.title}</S.OverlayTitle>
              <S.OverlayGenres>
                {movie.genres?.map((genre, index) => (
                  <span key={index}>
                    {genre}
                    {index < movie.genres.length - 1 ? ", " : ""}
                  </span>
                ))}
              </S.OverlayGenres>
            </S.MovieInfoOverlay>
          </S.MoviePoster>
        </S.MovieCard>
      ))}
    </S.MoviesGrid>
  )
}

export default Movies
