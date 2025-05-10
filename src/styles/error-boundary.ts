import { Separator, Typography } from "@/components/Shared"
import styled from "styled-components"

export const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  background-color: var(--bg-container);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MessageWrapper = styled.div`
  width: 55rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`

export const Title = styled(Typography)`
  font-size: var(--lg);
  color: var(--black);
  font-weight: var(--bold);
`

export const Divider = styled(Separator)``

export const ErrorMessage = styled(Typography)`
  font-size: var(--md);
  color: var(--disabled);
`
