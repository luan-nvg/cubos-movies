import { Avatar, Toggle } from "@/components/Shared"
import styled from "styled-components"

export const Wrapper = styled.header`
  width: 100%;
  background-color: var(--white);
`

export const titleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ProfileDiv = styled.header`
  display: flex;
  gap: 16px;
  justify-content: right;
  margin: 1.5rem 2.5rem;
  padding-right: 16px;
`

interface TitleProps {
  fontSize?: string
  color?: string
}

export const Title = styled.h1<TitleProps>`
  font-family: Poppins, Helvetica, "sans-serif";
  font-size: ${props => props.fontSize || "13px"};
  font-weight: 500;
  color: ${props => props.color || "var(--black)"};
`

export const Profile = styled(Avatar)`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  border: 2px solid var(--primary);
`

export const SwitchTheme = styled(Toggle)`
  width: 2rem;
  height: 2rem;
`

export const headSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 2.5rem;
`

export const rightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
