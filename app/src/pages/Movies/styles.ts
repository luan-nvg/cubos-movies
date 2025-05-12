import styled from "styled-components"
import { FaSearch } from "react-icons/fa"
import { DateTimePickerComponent } from "@/components/DateTimePicker"

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  position: relative;
`

export const BannerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
  }
`

export const Banner = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center 30%;
  opacity: 0.6;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background-color: #000;
`

export const FormSection = styled.div<{ banner?: string }>`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background-color: #232225;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem auto;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0 1rem;
  }
`

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: auto;
  min-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const SearchInput = styled.input`
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border-radius: 5px;
  border: 2px solid #232225;
  background-color: #1a191c;
  color: var(--white);
  font-size: 1rem;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #6f6d78;
  }
`

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 0.75rem;
  color: #6f6d78;
  font-size: 1rem;
  align-items: flex-end;
`

export const FiltersButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  border: none;
  background-color: var(--primary);
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-hover);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: var(--white);
`

export const Ellipsis = styled.span`
  padding: 0 0.5rem;
  color: #ffffff;
`

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

export const WrapperHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.625rem;
  gap: 0.625rem;
`

export const Main = styled.main`
  width: 100%;
  max-width: 38.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 3rem;
    color: #ffffff;
    width: 75%;
    font-weight: 500;
    text-align: center;
  }

  h3 {
    font-family: Poppins, Helvetica, "sans-serif";
    font-size: 1.3rem;
    color: #b5b5c3;
    font-weight: 500;
    margin-bottom: 7rem;
  }
`

export const Form = styled.form`
  width: 100%;
  max-width: 400px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

export const FieldWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 8px;
`

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #ffffff;
`

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 2px solid #232225;
  background-color: #1a191c;
  color: #ffffff;
  font-size: 1rem;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: #6f6d78;
  }
`

export const DateTimePicker = styled(DateTimePickerComponent)`
  width: 100%;
`

export const GenreInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const AddGenreButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: #ffffff;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;

  &:hover {
    background-color: var(--primary-hover);
  }
`

export const GenresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`

export const GenreTag = styled.div<{ theme?: string }>`
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.theme === "light" ? "#e0e0e0" : "#2e2e2e"};
  color: ${props => (props.theme === "light" ? "var(--black)" : "#ffffff")};
  padding: 0.5rem 0.75rem;
  border-radius: 5px;
  font-size: 0.875rem;
`

export const RemoveGenreButton = styled.button`
  background: none;
  border: none;
  color: #999999;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;

  &:hover {
    color: #ff6b6b;
  }
`

export const LinksWrapper = styled.div`
  font-family: Poppins, Helvetica, "sans-serif";
  margin: var(--md) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: fit-content;
  }
`

export const Footer = styled.footer`
  text-align: center;
  color: #94a3b8;
  font-size: 1rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
`

export const ErrorMessage = styled.div`
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

// Add these styles to your S.js styles file

export const PosterUploadContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`

export const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  span {
    color: ${props => (props.theme === "light" ? "#666" : "#aaa")};
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const UploadButton = styled.div`
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: #ffffff;
  border-radius: 5px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--primary-hover);
  }
`

export const PosterPreview = styled.div`
  width: 100%;
  margin: 1rem 0;
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 250px;
    object-fit: contain;
  }
`

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: #6f6d78;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #6f6d78;
  }

  span {
    margin: 0 10px;
    font-size: 0.875rem;
    text-transform: uppercase;
  }
`
