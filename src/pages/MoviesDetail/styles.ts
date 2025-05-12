import styled from "styled-components"
// Styled Components
export const Container = styled.div`
  color: #ffffff;
  font-family: sans-serif;
  min-height: 100vh;
`

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const MovieTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`

export const MovieOriginalTitle = styled.h2`
  font-size: 1.2rem;
  color: #aaaaaa;
  font-weight: normal;
  margin-top: 0;
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`

// Two Column Layout Components
export const TwoColumnLayout = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Column = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ImageAndSynopsisContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const PosterContainer = styled.div`
  flex: 0 0 auto;
  width: 280px;
`

export const PosterImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`

export const SynopsisContainer = styled.div`
  flex: 1;
`
export const SynopsisItem = styled.div`
  background-color: #32302c;
  padding: 15px;
`

export const Tagline = styled.p`
  color: #aaaaaa;
  font-style: italic;
  margin-bottom: 1.9rem;
  margin-top: 1.9rem;
`

export const SynopsisTitle = styled.h3`
  font-size: 1rem;
  color: #aaaaaa;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`

export const SynopsisText = styled.p`
  line-height: 1.5;
`

export const GenresContainer = styled.div`
  margin-bottom: 1rem;
  background-color: #32302c;
  height: 54px;
  padding: 15px;
  margin-top: 1.5rem;
`

export const GenresTitle = styled.h3`
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-bottom: 0.5rem;
`

export const GenresList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

export const GenreTag = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  text-transform: uppercase;
  background-color: #3d2747;
  padding: 6px;
`

// Stats Components
export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

export const StatBlock = styled.div`
  margin-bottom: 1rem;
  background-color: #32302c;
  height: 54px;
  padding: 15px;
`

export const StatTitle = styled.h4`
  font-size: 0.8rem;
  color: #aaaaaa;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`

export const StatValue = styled.div`
  font-size: 0.9rem;
`

export const RatingCircle = styled.div`
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

export const TrailerSection = styled.div`
  margin-top: 2rem;
`

export const TrailerTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  background-color: #111;
  border-radius: 8px;
  overflow: hidden;
`

export const FiltersButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  background-color: var(--primary, #4a4a4a);
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-hover, #5a5a5a);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`
