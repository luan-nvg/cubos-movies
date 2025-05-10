import styled from "styled-components"

export const Wrapper = styled.nav`
  font-size: 4rem;
  width: 100%;
  padding: 1rem;
`

export const list = styled.ul`
  display: flex;
  list-style: georgian;
`

export const item = styled.li`
  & + &::before {
    content: "•";
    margin: 0 8px;
  }
  /* font: var(--regular) 39.5% "Roboto", Helvetica, "sans-serif"; */
  font-size: var(--md);
  color: gray;
  display: flex;
  align-items: center;

  a {
    font-size: inherit;
    color: gray;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
`
