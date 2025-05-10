import { FaPlus } from "react-icons/fa"
import styled from "styled-components"

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
  background-position: center;
  opacity: 0.7;
`

export const FormSection = styled.div<{ banner: string | undefined }>`
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
  box-sizing: border-box; // Garante que padding não aumente a largura

  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
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

export const IconAdd = styled(FaPlus)`
  margin-top: 0.313rem;
`

export const RegisterNewAccount = styled.p`
  font-weight: 500;
  font-family: Poppins, Helvetica, "sans-serif";
  font-size: 1.6rem;
  color: #e2e8f0;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden; // Previne scroll horizontal
  position: relative;
  background-color: #000;
`

export const Footer = styled.footer`
  text-align: center;
  color: #94a3b8;
  font-size: 1.5rem;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`
