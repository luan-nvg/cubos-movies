import { useState } from "react"
import { useIntl } from "react-intl"
import Modal from "@/components/Modal"
import { Input, Typography } from "@/components/Shared"
import * as S from "../styles"
import moment from "moment"
import AnimatedAlert from "@/components/Alert/AnimatedAlert"
import { useTheme } from "@/hooks/useTheme"

// Format date for API calls
function formatDate(date: moment.MomentInput) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss")
}

// Get Current Date - 7
function generateInitialDate() {
  const today = new Date()
  const initialDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return initialDate.toISOString().slice(0, 16)
}

// Get Current Date
function currentISODateFormatted() {
  return new Date().toISOString().slice(0, 16)
}

interface FilterModalProps {
  isVisible: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterFormData) => void
}

export interface FilterFormData {
  title: string
  initialDate: string
  finalDate: string
}

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApplyFilters
}) => {
  const intl = useIntl()
  const { theme } = useTheme()

  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const [formData, setFormData] = useState<FilterFormData>({
    initialDate: generateInitialDate(),
    finalDate: currentISODateFormatted(),
    title: ""
  })

  const handleSubmitFilters = () => {
    try {
      onApplyFilters(formData)
      onClose()
    } catch (err: any) {
      setAlert({
        message: err.message || "Erro inesperado. Tente novamente mais tarde.",
        type: "error"
      })
    }
  }

  if (!isVisible) return null

  return (
    <Modal
      textbuttonSave="Aplicar Filtros"
      title={intl.formatMessage({ id: "general.report" })}
      onClose={onClose}
      onSave={handleSubmitFilters}
    >
      {alert && (
        <AnimatedAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          Nome do Filme
        </Typography>
        <Input
          id="title"
          placeholder="Nome do filme"
          value={formData.title}
          onChange={e => {
            setFormData({ ...formData, title: e.target.value })
          }}
          backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
          placeholdercolor="#6f6d78"
          style={{
            border: "2px solid",
            borderColor: theme === "light" ? "var(--black)" : "#232225",
            color: theme === "light" ? "var(--black)" : "var(--white)"
          }}
        />
      </S.FieldWrapper>

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          {intl.formatMessage({ id: "report.startDate.placeholder" })}
        </Typography>
        <S.DateTimePicker
          value={formData.initialDate}
          onChange={date => {
            setFormData({ ...formData, initialDate: date })
          }}
          label={""}
          style={{
            backgroundColor: theme === "light" ? "var(--white)" : "#1a191c",
            border: "2px solid",
            borderColor: theme === "light" ? "var(--black)" : "#232225",
            color: theme === "light" ? "var(--black)" : "var(--white)"
          }}
        />
      </S.FieldWrapper>

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          {intl.formatMessage({ id: "report.endDate.placeholder" })}
        </Typography>
        <S.DateTimePicker
          value={formData.finalDate}
          onChange={date => {
            setFormData({ ...formData, finalDate: date })
          }}
          label={""}
          style={{
            backgroundColor: theme === "light" ? "var(--white)" : "#1a191c",
            border: "2px solid",
            borderColor: theme === "light" ? "var(--black)" : "#232225",
            color: theme === "light" ? "var(--black)" : "var(--white)"
          }}
        />
      </S.FieldWrapper>
    </Modal>
  )
}

export default FilterModal
