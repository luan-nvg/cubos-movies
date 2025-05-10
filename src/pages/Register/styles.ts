import { Button } from "@/components/Shared"
import styled from "styled-components"

export const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const WrapperHeader = styled.div`
  position: absolute;
  top: 0.313rem;
  padding: 0.625rem;
  right: 1rem;
  display: flex;
  gap: 0.625rem;

  button {
    display: flex;
    justify-content: center;
    height: 2.125rem;
    gap: 0.625rem;
    align-items: center;
    border-radius: 1rem;
  }
`

export const ButtonST = styled(Button)`
  background-color: var(--primary);
  width: 14rem;
  border-radius: 1rem;
  color: var(--bg-light);
  padding: 15px 30px;

  &:hover {
    background-color: var(--primary-hover);
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
    width: 75%;
    font-weight: 700;
    text-align: center;
  }
`

export const FieldWrapper = styled.div`
  width: 100%;
  margin: 1.6rem 0;
  display: flex;
  justify-content: center;
  flex-direction: column;

  label {
    padding: 1.25rem 0;
  }

  input {
    font-size: var(--sm);
    padding: 0.8rem 1.2rem;
    background-color: var(--bg-light);
    color: var(--black);
    width: 100%;
    padding-left: 3.2rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 16px;
    border-radius: 1rem;
    border: none;

    &::placeholder {
      color: var(--black);
      font-size: var(--sm);
    }

    &:focus {
      outline: 0.5px solid #2774b3;
    }
  }
`

export const Form = styled.form`
  width: 500px;
`

export const SecurityPassword = styled.div`
  width: 100%;
  margin-top: 2.8rem;

  ul {
    color: #64748b;
  }

  li {
    font-size: 1.4rem;
    margin: 2rem 1rem 1.5rem 2.3rem;
  }
`

export const ButtonWrapper = styled.div`
  width: 100%;
  margin: 1.6rem 0;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 100%;
    margin: 4.375rem 0 1.563rem 0;
    font-size: 1.8rem;
    border-radius: 1rem;
  }
`

export const Footer = styled.footer`
  width: 100%;
  position: absolute;
  bottom: 0rem;
  text-align: center;
  color: #94a3b8;
  font-size: var(--md);
  padding: 1.8rem 0;
`
