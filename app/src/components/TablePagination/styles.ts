import styled from "styled-components"
import { Typography } from "@/components/Shared"

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8rem;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const Cont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const DropDownWrapper = styled.div`
  width: auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`

export const InfoText = styled(Typography)`
  color: ${props =>
    props.theme === "light" ? "var(--black)" : "var(--white)"};
  font-size: var(--sm);
  margin-top: 2rem;
  text-align: left;

  @media (max-width: 767px) {
    margin-top: 0;
    text-align: center;
  }
`

export const PaginationContainer = styled.div`
  /* width: 100%; */

  @media (max-width: 767px) {
    overflow-x: auto;

    .pagination {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 4px;

      button,
      .page-item {
        min-width: 36px;
        height: 36px;
        font-size: 0.875rem;
      }
    }
  }
`
