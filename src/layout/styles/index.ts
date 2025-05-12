import styled from "styled-components"

export const Page = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
`

export const PageContainer = styled.main`
  padding: 1rem 3rem;
  background-color: var(--bg-default);
  width: 100%;
  justify-items: left;
  overflow-x: auto;
  height: 100%;
`

export const PageContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1.6rem;
  width: 100%;
  align-items: start;
  background-color: var(--bg-default);

  .page-content {
    margin-top: 10rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: ${props =>
      props.theme === "light" ? "var(--white)" : "var(--black)"};
    border-radius: 5px;
    align-items: left;
    width: 100%;
    gap: 2.4rem;
    height: fit-content;
  }

  /* === SCROLLBAR OMITIDO PARA FOCO NO RESPONSIVO === */

  /* ✅ Estilos específicos para mobile (até 414px) */
  @media (max-width: 414px) {
    .page-content {
      padding: 1rem;
      margin-top: 5rem;
      gap: 1rem;
      font-size: 14px;
    }
  }

  /* ✅ Estilos específicos para desktop full HD (1366px ou mais) */
  @media (min-width: 1366px) {
    .page-content {
      max-width: 1280px;
      margin: 10rem auto 0;
    }
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  scrollbar-width: auto;
  scrollbar-color: #888 #f1f1f1;

  &::-moz-scrollbar {
    width: 12px;
  }

  &::-moz-scrollbar-track {
    background: #f1f1f1;
    border-radius: 6px;
  }

  &::-moz-scrollbar-thumb {
    background: #888;
    border-radius: 6px;
  }

  &::-moz-scrollbar-thumb:hover {
    background: #555;
  }
`

export const Footer = styled.footer`
  width: 100%;
  text-align: center;
  color: var(--disabled);
  opacity: 0.7;
  font-size: 1.6rem;
  padding: 0 0 2.4rem;
`
