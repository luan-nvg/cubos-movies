import styled from "styled-components"
import { Avatar, Pagination, Typography } from "@/components/Shared"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

export const SubtitleWrapper = styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`
export const PageTitle = styled(Typography)`
  font-size: var(--xl);
  font-weight: var(--bold);
  color: var(--black);
`

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

export const LocalDate = styled.p`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  height: 14px;
  line-height: 14px;
  color: #2e1065;
  margin-right: 14px;
`
export const TitleTable = styled(Typography)`
  font-size: var(--lg);
  font-weight: var(--semibold);
`

export const TableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const NewProjectButton = styled(Button)`
  font-size: 14px;
  font-weight: 600;
  width: fit-content;
  align-items: center;
  height: fit-content;
  gap: 10px;
`

export const TeamsWrapper = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  gap: 2.4rem;
`

export const Team = styled(Avatar)`
  width: 6.4rem;
  height: 6.4rem;
  border: 2px solid var(--primary);
`

export const TitleCard = styled(Typography)`
  font-size: var(--lg);
  font-weight: var(--bold);
  margin-top: 25px;
  margin-left: 31px;
`

export const DashBoard = styled.div`
  display: grid;
  grid-template-columns: 394px auto;
  /* grid-template-rows: 390px 344px; */
  row-gap: 24px;
  column-gap: 46px;
`

export const DashboardCard = styled.div`
  height: 390px;
  width: 394px;
  background-color: var(--bg-container);
  border-radius: 8px;
`

export const TableWrapper = styled.div`
  height: 390px;
  overflow: auto;
  padding: 1.2rem 2.4rem;
  z-index: 10;
  min-height: fit-content;
  background-color: var(--bg-container);
  border-radius: 8px;
`

export const DashboardBurndown = styled.div`
  height: 344px;
  width: 100%;
  background-color: var(--bg-container);
  border-radius: 8px;
`

export const InputWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 1.6rem;
  margin-left: auto;
`

export const SearchInput = styled(Input)`
  label {
    display: none;
  }

  input {
    background-color: var(--white);

    &::placeholder {
      color: var(--disabled);
    }
  }
`

export const EditTeam = styled(Button)`
  background-color: transparent;
  padding: 0.8rem;
  outline: none;
  transition: 0.5s linear;
  border: 1px solid var(--black);
  color: var(--black);
  width: fit-content;

  &:hover {
    background-color: var(--white);
    color: var(--black);
  }
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8rem;
  width: 100%;
`

export const InfoText = styled(Typography)`
  font-size: var(--sm);
  margin-top: 2rem;
`

export const PaginationComponent = styled(Pagination)`
  background-color: var(--primary);
  color: var(--white);
  border-radius: 8px;
  font-size: var(--sm);

  &:disabled {
    color: var(--disabled);
    background-color: var(--bg-disabled);

    &:hover {
      cursor: not-allowed;
      color: var(--disabled);
      background-color: var(--bg-disabled);
    }
  }

  &:hover {
    background-color: var(--primary-hover);
  }
`
