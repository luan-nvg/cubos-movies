import { Button } from "@/components/Button"
import LabelDropdown from "@/components/LabelDropdown"
import { FormOneColumn } from "@/layout/Forms/OneColumn"
import { DatePicker, Input, Label, Typography } from "@/components/Shared"
import styled from "styled-components"
import ReactQuill from "react-quill" // Add this import if you're using ReactQuill
import "react-quill/dist/quill.snow.css" // Add this if you're using ReactQuill

export const FormWrapper = styled(FormOneColumn)``

export const FormItem = styled(Input)`
  font-size: var(--sm);
  padding: 0.8rem 1.2rem;
  background-color: var(--bg-light);
  color: var(--black);
  width: 100%;
  padding-left: 3.2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 16px;
  border-radius: 1rem;

  &::placeholder {
    color: var(--black);
    font-size: var(--sm);
  }
`

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  width: 100%;
  gap: 1.6rem;
`
export const ItemLabel = styled(Label)`
  color: var(--black);
  font-size: var(--md);
  font-weight: var(--semibold);
`

export const DatePickerItem = styled(DatePicker)`
  font-size: var(--sm);
  padding: 0.8rem 1.2rem;
  background-color: var(--bg-light);
  color: var(--black);
  width: 50rem;
  padding-left: 3.2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 16px;
  border-radius: 1rem;
`

export const Subtitle = styled(Typography)`
  font-size: var(--md);
  font-weight: var(--semibold);
`
export const FormDropdown = styled(LabelDropdown)`
  label {
    font-size: var(--md);
    font-weight: var(--semibold);
  }
`

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  width: 100%;
  gap: 1.6rem;
`

export const DescriptionLabel = styled(Label)`
  color: var(--black);
  font-size: var(--md);
  font-weight: var(--semibold);
`

export const CreateProjectButton = styled(Button)``

// Add ProjectDescription component for rich text editor
export const ProjectDescription = styled(ReactQuill)`
  .ql-container {
    border-radius: 0 0 1rem 1rem;
    background-color: var(--bg-light);
    min-height: 12rem;
  }

  .ql-toolbar {
    border-radius: 1rem 1rem 0 0;
    background-color: #f8f8f8;
  }

  .ql-editor {
    font-size: var(--sm);
    color: var(--black);
    min-height: 12rem;
  }
`
