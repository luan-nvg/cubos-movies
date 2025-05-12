import styled from "styled-components"
import { Button } from "@/components/Button" // Assuming you have a Button component
import MoreOptions from "@/components/Dropdown" // Assuming you have a DropDown component
import { DateTimePickerComponent } from "@/components/DateTimePicker" // Assuming you have a
import SearchInputCp from "@/components/SearchInput" // Assuming you have a SearchInput component

export const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  width: 100%;
`

export const Subtitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`

export const NewButton = styled(Button)`
  width: fit-content;
  padding: 1.2rem 2.4rem;
`

export const LoadingIndicator = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3699ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export const ChartTitle = styled.h6`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
`

export const Label = styled.label`
  font-size: 15px;
  margin-bottom: 10px !important;
  color: #4a4a4a;
`

export const DropDownInput = styled(MoreOptions)`
  width: 100%;
`

export const DateTimePicker = styled(DateTimePickerComponent)`
  width: 100%;
`

export const InfoText = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-top: 10px;
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`

export const SearchInput = styled(SearchInputCp)`
  width: 100%;
`

export const SectionSubtitle = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ChartWrapper = styled.div``
