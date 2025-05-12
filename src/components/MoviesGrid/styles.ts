import styled from "styled-components"

export const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`
export const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`

export const MoviePoster = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
`

export const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const MovieTitle = styled.h3`
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const MovieYear = styled.span`
  padding: 0 0.75rem 0.75rem;
  font-size: 0.8rem;
  color: #999999;
  text-align: center;
`

export const RatingCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%; /* Reduzi o tamanho da bola */
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5); /* fundo opaco sutil */
  border-radius: 50%;
`

export const ProgressSvg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* começa do topo */
`

export const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.1); /* cor da parte "faltante" */
  stroke-width: 1; /* tubo mais fino */
`

export const CircleProgress = styled.circle`
  fill: none;
  stroke-width: 1;
  stroke-linecap: round;
  stroke: ${({ rating }) => {
    if (rating >= 80) return "#4CAF50" // verde
    if (rating >= 60) return "#ffe000" // amarelo
    return "#F44336" // vermelho
  }};
  stroke-dasharray: 100;
  stroke-dashoffset: ${({ rating }) => 100 - rating};
  transition: stroke-dashoffset 0.5s ease;
`

export const RatingValue = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Mantém o valor no centro */
  font-weight: bold;
  font-size: 3rem; /* Reduzi o tamanho do texto */
  text-shadow: 0 0 3px #000;
  color: ${({ rating }) => {
    if (rating >= 80) return "#4CAF50" // verde
    if (rating >= 60) return "#ffe000" // amarelo
    return "#F44336" // vermelho
  }};
`

export const RatingValueContainer = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.1rem;
`

export const RatingNumber = styled.span`
  font-weight: bold;
  font-size: 2.8rem; /* aumentei de 2.2rem */
  color: ${({ rating }) => {
    if (rating >= 80) return "#4CAF50"
    if (rating >= 60) return "#ffe000"
    return "#F44336"
  }};
`

export const RatingPercent = styled.span`
  font-weight: bold;
  font-size: 1.5rem; /* Ajustei o tamanho da porcentagem */
  color: #ffffff;
  line-height: 1;
  display: inline-block;
  align-self: center;
  transform: translateY(
    0
  ); /* Garante que a porcentagem apareça na posição certa */
`

export const MovieGenres = styled.div`
  padding: 0 0.75rem 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;

  span {
    background-color: #333;
    color: #fff;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    white-space: nowrap;
  }
`

export const MovieInfoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent 60%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  z-index: 2;
`

export const OverlayTitle = styled.h3`
  font-size: 1.95rem;
  font-weight: bold;
  color: white;
  margin: 0;
  text-align: flex-start;
`

export const OverlayGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;

  span {
    color: #ffffff;
    font-size: 0.95rem;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
  }
`
