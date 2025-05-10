import { FaPlus } from "react-icons/fa"
import styled from "styled-components"

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

export const BannerWrapper = styled.div`
  width: 60%;
  height: 90%;
  background-color: #1e3a8a; /* Cor de fundo semelhante à imagem */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const Banner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const FormSection = styled.div<{ banner: string | undefined }>`
  width: ${({ banner }) => (banner ? "70%" : "100%")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    margin: 0 1rem;
  }
`

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const WrapperHeader = styled.div`
  position: absolute;
  top: 0.313rem;
  padding: 0.625rem;
  right: 1rem;
  display: flex;
  gap: 0.625rem;
`

export const IconAdd = styled(FaPlus)`
  margin-top: 0.313rem;
`

export const RegisterNewAccount = styled.p`
  font-weight: 500;
  font-family: Poppins, Helvetica, "sans-serif";
  font-size: 1.6rem;
  color: gray;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  a {
    color: #3699ff;
    font-weight: 500;
    text-decoration: none;
    font-size: 1.6rem;

    @media screen and (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  img {
    width: 2.5rem;
    border-radius: 4px;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
`

export const FormWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
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
    color: #3f4254;
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
  width: 400px;

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
`

export const RememberMyAcess = styled.div`
  display: flex;

  div {
    gap: 1.5rem;
  }

  label {
    font-weight: 900;
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

export const ForgotPasswordWrapper = styled.div`
  align-items: center;

  a {
    color: #728299;
    font-size: 1.1rem;
    font-weight: var(--regular);
    text-decoration: none;
  }
`

export const Footer = styled.footer`
  width: 100%;
  text-align: center;
  color: #94a3b8;
  font-size: var(--md);
  padding-bottom: 1rem;
`
