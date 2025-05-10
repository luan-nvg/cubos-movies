import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as S from "./styles"
import { Label, Input } from "@/components/Shared"

// Define proper interfaces for props and form values
interface ProjectFormProps {
  onSubmit: (data: ProjectFormValues) => void
  buttonText?: string
  initialData?: Partial<ProjectFormValues>
}

interface ProjectFormValues {
  name: string
  descr: string
  repo: string
  date: Date | string
  prazo: Date | string
  team: string
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  buttonText = "Salvar Projeto",
  initialData = {}
}) => {
  const { handleSubmit, register, setValue } = useForm<ProjectFormValues>({
    defaultValues: initialData as Partial<ProjectFormValues>
  })

  const handleDateChange = (date: Date) => {
    setValue("prazo", date)
  }

  useEffect(() => {
    // Atualiza os valores do formulário quando os dados iniciais mudarem
    if (initialData) {
      // Preenche os valores com base em initialData
      if ("name" in initialData) setValue("name", initialData.name as string)
      if ("descr" in initialData) setValue("descr", initialData.descr as string)
      if ("repo" in initialData) setValue("repo", initialData.repo as string)
      if ("date" in initialData)
        setValue("date", initialData.date as Date | string)
      if ("team" in initialData) setValue("team", initialData.team as string)
    }
  }, [initialData, setValue])

  return (
    <>
      <S.FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Label
          text="Nome do Projeto:"
          fontsize="var(--md)"
          fontweight="var(--semibold)"
        />
        <Input
          backgroundcolor="#fff"
          width="100%"
          placeholder="Nome"
          id="name"
          paddingleft="1rem"
          className="custom-input"
          {...register("name")}
        />
        <S.ItemWrapper>
          <S.ItemLabel
            htmlFor="project-description"
            text="Descrição do Projeto:"
          />
          <S.ProjectDescription
            id="project-description"
            placeholder="Descrição do Projeto"
            defaultValue="Descrição do Projeto"
            onChange={(editor: any) => {
              if (editor && editor.getLength) {
                const value = editor.getLength() > 1 ? editor.getText() : ""
                setValue("descr", value)
              }
            }}
          />
        </S.ItemWrapper>
        <Label
          text="Repositório Principal:"
          fontsize="var(--md)"
          fontweight="var(--semibold)"
        />
        <Input
          placeholder="URL do github"
          id="repo"
          paddingleft="1rem"
          className="custom-input"
          {...register("repo")}
        />
        <Label
          text="Prazo de Conclusão:"
          fontsize="var(--md)"
          fontweight="var(--semibold)"
        />
        <S.DatePickerItem
          onChange={(date: string | Date) => handleDateChange(new Date(date))}
        />

        <S.CreateProjectButton
          textbutton={buttonText}
          onClick={handleSubmit(onSubmit)}
        />
      </S.FormWrapper>
    </>
  )
}

export default ProjectForm
