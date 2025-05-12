import { Button } from "@/components/Button"
import { Typography } from "@/components/Shared"
import styled from "styled-components"

export const Subtitle = styled(Typography)`
  font-size: var(--md);
  color: var(--black);
`

export const ButtonWrapper = styled.div`
  margin-top: 200px;
`

export const ButtonBack = styled(Button)`
  width: 27.5rem;
  color: var(--white);
  padding: 1.2rem;
`
