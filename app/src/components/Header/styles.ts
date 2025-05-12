import { Avatar, Toggle } from "@/components/Shared"
import styled from "styled-components"

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 30%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
  z-index: 10;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
`

export const titleWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ProfileDiv = styled.header`
  display: flex;
  gap: 16px;
  justify-content: right;
  margin: 1.5rem 2.5rem;
  padding-right: 16px;
`

export const Title = styled.h1`
  font-family: Poppins, Helvetica, "sans-serif";
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white);
  margin: 0;
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
  height: 60px;
  width: 100%;
`

export const rightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-right: 3rem;
`
