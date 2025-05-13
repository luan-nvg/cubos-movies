import { useState } from "react"
import { Typography } from "@/components/Shared"
import { Input } from "@/components/Shared"
import * as S from "../styles"
import Modal from "@/components/Modal"
import AnimatedAlert from "@/components/Alert/AnimatedAlert"
import { useTheme } from "@/hooks/useTheme"
import { z } from "zod"
import createMoveis from "@/services/movies/createMoveis"
import imageMoveis from "@/services/movies/imageMoveis"

// Schema de validação com Zod - modificada para permitir arquivo ou URL para poster e banner
const movieSchema = z.object({
  // posterUrl é opcional se tiver um arquivo de poster
  posterUrl: z.string().optional(),
  // bannerUrl é opcional se tiver um arquivo de banner
  bannerUrl: z.string().optional(),
  title: z.string().min(1, "Título é obrigatório"),
  releaseDate: z.string().min(1, "Data de lançamento é obrigatória"),
  originalTitle: z.string().min(1, "Título original é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  budget: z.number().min(1, "Orçamento deve ser maior que zero"),
  genres: z.array(z.string()).min(1, "Adicione pelo menos um gênero"),
  duration: z.number().min(1, "Duração deve ser maior que zero")
})

type MovieSchema = z.infer<typeof movieSchema>

interface AddMovieModalProps {
  isVisible: boolean
  onClose: () => void
  onSaveMovie: (movieData: MovieFormData) => void
}

export interface MovieFormData {
  posterUrl: string
  bannerUrl: string
  title: string
  releaseDate: string
  originalTitle: string
  description: string
  budget: number
  genres: string[]
  duration: number
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({
  isVisible,
  onClose,
  onSaveMovie
}) => {
  const { theme } = useTheme()

  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const [formErrors, setFormErrors] = useState<{
    [key: string]: string
  }>({})

  const [formData, setFormData] = useState<MovieFormData>({
    posterUrl: "",
    bannerUrl: "",
    title: "",
    releaseDate: new Date().toISOString().slice(0, 10),
    originalTitle: "",
    description: "",
    budget: 100,
    genres: [],
    duration: 50
  })

  // Estado para armazenar o arquivo de poster selecionado
  const [posterFile, setPosterFile] = useState<File | null>(null)
  // Estado para visualizar a prévia da imagem selecionada
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Estado para armazenar o arquivo de banner selecionado
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  // Estado para visualizar a prévia da imagem do banner selecionada
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null)

  const [genreInput, setGenreInput] = useState<string>("")

  const handleAddGenre = () => {
    if (genreInput && !formData.genres?.includes(genreInput)) {
      setFormData({
        ...formData,
        genres: [...(formData.genres || []), genreInput]
      })
      setGenreInput("")
      // Limpar erro dos gêneros se existir
      if (formErrors.genres) {
        setFormErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.genres
          return newErrors
        })
      }
    }
  }

  const handleRemoveGenre = (genre: string) => {
    setFormData({
      ...formData,
      genres: formData.genres?.filter(g => g !== genre)
    })
  }

  // Manipula a seleção de arquivo para o poster
  const handlePosterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    // Atualiza o estado com o arquivo selecionado
    setPosterFile(file)

    // Limpa os erros de validação para o poster
    if (formErrors.posterUrl) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.posterUrl
        return newErrors
      })
    }

    // Cria uma URL para pré-visualização da imagem
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)

      // Limpa a posterUrl já que estamos usando um arquivo
      setFormData(prev => ({ ...prev, posterUrl: "" }))
    }
  }

  // Manipula a seleção de arquivo para o banner
  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    // Atualiza o estado com o arquivo selecionado
    setBannerFile(file)

    // Limpa os erros de validação para o banner
    if (formErrors.bannerUrl) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.bannerUrl
        return newErrors
      })
    }

    // Cria uma URL para pré-visualização da imagem
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setBannerPreviewUrl(fileUrl)

      // Limpa a bannerUrl já que estamos usando um arquivo
      setFormData(prev => ({ ...prev, bannerUrl: "" }))
    }
  }

  // Opção para inserir URL manualmente ao invés de fazer upload
  const handlePosterUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData({ ...formData, posterUrl: url })

    // Limpa o arquivo e a prévia se uma URL for inserida
    if (url) {
      setPosterFile(null)
      setPreviewUrl(null)
    }

    // Limpa os erros de validação para o poster
    if (formErrors.posterUrl) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.posterUrl
        return newErrors
      })
    }
  }

  // Opção para inserir URL manualmente ao invés de fazer upload para o banner
  const handleBannerUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData({ ...formData, bannerUrl: url })

    // Limpa o arquivo e a prévia se uma URL for inserida
    if (url) {
      setBannerFile(null)
      setBannerPreviewUrl(null)
    }

    // Limpa os erros de validação para o banner
    if (formErrors.bannerUrl) {
      setFormErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.bannerUrl
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    try {
      // Verificar se há pelo menos um método de poster (URL ou arquivo)
      if (!formData.posterUrl && !posterFile) {
        setFormErrors(prev => ({
          ...prev,
          posterUrl: "Forneça uma URL de poster ou faça upload de uma imagem"
        }))
        setAlert({
          message: "Por favor, forneça uma imagem para o poster",
          type: "error"
        })
        return false
      }

      // Validação com Zod
      movieSchema.parse(formData)
      setFormErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {}
        error.errors.forEach(err => {
          const field = err.path[0] as string
          errors[field] = err.message
        })
        setFormErrors(errors)
        setAlert({
          message: "Por favor, corrija os erros no formulário",
          type: "error"
        })
      }
      return false
    }
  }

  const handleSubmitMovie = async () => {
    try {
      if (!validateForm()) {
        return
      }

      // Chama o serviço passando tanto os dados do formulário quanto o arquivo
      const res = await createMoveis(formData)

      // Upload do poster
      await imageMoveis(res.id, posterFile, "logo")

      // Upload do banner (se existir)
      if (bannerFile) {
        await imageMoveis(res.id, bannerFile, "banner")
      }

      // Notifica o componente pai
      onSaveMovie(formData)

      // Fecha o modal
      onClose()

      // Reseta o formulário para valores iniciais
      setFormData({
        posterUrl: "",
        bannerUrl: "",
        title: "",
        releaseDate: new Date().toISOString().slice(0, 10),
        originalTitle: "",
        description: "",
        budget: 100,
        genres: [],
        duration: 50
      })
      setPosterFile(null)
      setPreviewUrl(null)
      setBannerFile(null)
      setBannerPreviewUrl(null)
    } catch (err: any) {
      setAlert({
        message: err.message || "Erro inesperado. Tente novamente mais tarde.",
        type: "error"
      })
    }
  }

  const getFieldErrorStyle = (fieldName: string) => {
    return formErrors[fieldName]
      ? {
          borderColor: "var(--error)",
          borderWidth: "2px"
        }
      : {}
  }

  if (!isVisible) return null

  return (
    <Modal
      variant="slide-right"
      textbuttonSave="Salvar Filme"
      title="Adicionar Novo Filme"
      onClose={onClose}
      onSave={handleSubmitMovie}
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
          Título do Filme *
        </Typography>
        <Input
          id="title"
          placeholder="Título do filme"
          value={formData.title}
          onChange={e => {
            setFormData({ ...formData, title: e.target.value })
            if (formErrors.title) {
              setFormErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.title
                return newErrors
              })
            }
          }}
          required
          backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
          placeholdercolor="#6f6d78"
          style={{
            border: "2px solid",
            borderColor: formErrors.title
              ? "var(--error)"
              : theme === "light"
              ? "var(--black)"
              : "#232225",
            color: theme === "light" ? "var(--black)" : "var(--white)",
            ...getFieldErrorStyle("title")
          }}
        />
        {formErrors.title && (
          <S.ErrorMessage>{formErrors.title}</S.ErrorMessage>
        )}
      </S.FieldWrapper>

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          Título Original *
        </Typography>
        <Input
          id="originalTitle"
          placeholder="Título original"
          value={formData.originalTitle || ""}
          onChange={e => {
            setFormData({ ...formData, originalTitle: e.target.value })
            if (formErrors.originalTitle) {
              setFormErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.originalTitle
                return newErrors
              })
            }
          }}
          required
          backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
          placeholdercolor="#6f6d78"
          style={{
            border: "2px solid",
            borderColor: formErrors.originalTitle
              ? "var(--error)"
              : theme === "light"
              ? "var(--black)"
              : "#232225",
            color: theme === "light" ? "var(--black)" : "var(--white)",
            ...getFieldErrorStyle("originalTitle")
          }}
        />
        {formErrors.originalTitle && (
          <S.ErrorMessage>{formErrors.originalTitle}</S.ErrorMessage>
        )}
      </S.FieldWrapper>

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          Data de Lançamento *
        </Typography>
        <S.DateTimePicker
          id="releaseDate"
          value={formData.releaseDate}
          onChange={e => {
            setFormData({ ...formData, releaseDate: e.target.value })
            if (formErrors.releaseDate) {
              setFormErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.releaseDate
                return newErrors
              })
            }
          }}
          required
          backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
          placeholdercolor="#6f6d78"
          style={{
            border: "2px solid",
            borderColor: formErrors.releaseDate
              ? "var(--error)"
              : theme === "light"
              ? "var(--black)"
              : "#232225",
            color: theme === "light" ? "var(--black)" : "var(--white)",
            ...getFieldErrorStyle("releaseDate")
          }}
        />
        {formErrors.releaseDate && (
          <S.ErrorMessage>{formErrors.releaseDate}</S.ErrorMessage>
        )}
      </S.FieldWrapper>

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          Poster do Filme *
        </Typography>

        {/* Área de upload de arquivo */}
        <S.PosterUploadContainer>
          <S.FileInputLabel theme={theme}>
            <Input
              id="posterFile"
              type="file"
              accept="image/*"
              onChange={handlePosterFileChange}
              style={{ display: "none" }}
            />
            <S.UploadButton theme={theme}>Selecionar arquivo</S.UploadButton>
            <span>
              {posterFile ? posterFile.name : "Nenhum arquivo selecionado"}
            </span>
          </S.FileInputLabel>
        </S.PosterUploadContainer>

        {/* Pré-visualização da imagem */}
        {previewUrl && (
          <S.PosterPreview>
            <img src={previewUrl} alt="Prévia do poster" />
          </S.PosterPreview>
        )}

        {formErrors.posterUrl && (
          <S.ErrorMessage>{formErrors.posterUrl}</S.ErrorMessage>
        )}
      </S.FieldWrapper>

      {/* Novo campo para o Banner do Filme */}
      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          Banner do Filme
        </Typography>

        {/* Área de upload de arquivo para o banner */}
        <S.PosterUploadContainer>
          <S.FileInputLabel theme={theme}>
            <Input
              id="bannerFile"
              type="file"
              accept="image/*"
              onChange={handleBannerFileChange}
              style={{ display: "none" }}
            />
            <S.UploadButton theme={theme}>Selecionar arquivo</S.UploadButton>
            <span>
              {bannerFile ? bannerFile.name : "Nenhum arquivo selecionado"}
            </span>
          </S.FileInputLabel>
        </S.PosterUploadContainer>

        {/* Pré-visualização da imagem do banner */}
        {bannerPreviewUrl && (
          <S.PosterPreview>
            <img src={bannerPreviewUrl} alt="Prévia do banner" />
          </S.PosterPreview>
        )}

        {formErrors.bannerUrl && (
          <S.ErrorMessage>{formErrors.bannerUrl}</S.ErrorMessage>
        )}
      </S.FieldWrapper>

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          Descrição *
        </Typography>
        <S.TextArea
          id="description"
          placeholder="Descrição do filme"
          value={formData.description || ""}
          onChange={e => {
            setFormData({ ...formData, description: e.target.value })
            if (formErrors.description) {
              setFormErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors.description
                return newErrors
              })
            }
          }}
          required
          rows={4}
          style={{
            backgroundColor: theme === "light" ? "var(--white)" : "#1a191c",
            border: "2px solid",
            borderColor: formErrors.description
              ? "var(--error)"
              : theme === "light"
              ? "var(--black)"
              : "#232225",
            color: theme === "light" ? "var(--black)" : "var(--white)",
            ...getFieldErrorStyle("description")
          }}
        />
        {formErrors.description && (
          <S.ErrorMessage>{formErrors.description}</S.ErrorMessage>
        )}
      </S.FieldWrapper>

      <S.FormRow>
        <S.FieldWrapper>
          <Typography
            as="h1"
            size="1.5rem"
            color={theme === "light" ? "var(--black)" : "var(--white)"}
          >
            Orçamento *
          </Typography>
          <Input
            id="budget"
            type="number"
            placeholder="Orçamento"
            value={formData.budget || ""}
            onChange={e => {
              setFormData({
                ...formData,
                budget: Number(e.target.value) || 0
              })
              if (formErrors.budget) {
                setFormErrors(prev => {
                  const newErrors = { ...prev }
                  delete newErrors.budget
                  return newErrors
                })
              }
            }}
            required
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
            style={{
              border: "2px solid",
              borderColor: formErrors.budget
                ? "var(--error)"
                : theme === "light"
                ? "var(--black)"
                : "#232225",
              color: theme === "light" ? "var(--black)" : "var(--white)",
              ...getFieldErrorStyle("budget")
            }}
          />
          {formErrors.budget && (
            <S.ErrorMessage>{formErrors.budget}</S.ErrorMessage>
          )}
        </S.FieldWrapper>

        <S.FieldWrapper>
          <Typography
            as="h1"
            size="1.5rem"
            color={theme === "light" ? "var(--black)" : "var(--white)"}
          >
            Duração (min) *
          </Typography>
          <Input
            id="duration"
            type="number"
            placeholder="Duração em minutos"
            value={formData.duration || ""}
            onChange={e => {
              setFormData({
                ...formData,
                duration: Number(e.target.value) || 0
              })
              if (formErrors.duration) {
                setFormErrors(prev => {
                  const newErrors = { ...prev }
                  delete newErrors.duration
                  return newErrors
                })
              }
            }}
            required
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
            style={{
              border: "2px solid",
              borderColor: formErrors.duration
                ? "var(--error)"
                : theme === "light"
                ? "var(--black)"
                : "#232225",
              color: theme === "light" ? "var(--black)" : "var(--white)",
              ...getFieldErrorStyle("duration")
            }}
          />
          {formErrors.duration && (
            <S.ErrorMessage>{formErrors.duration}</S.ErrorMessage>
          )}
        </S.FieldWrapper>
      </S.FormRow>

      <S.FieldWrapper>
        <Typography
          as="h1"
          size="1.5rem"
          color={theme === "light" ? "var(--black)" : "var(--white)"}
        >
          Gêneros *
        </Typography>
        <S.GenreInputContainer>
          <Input
            id="genre"
            placeholder="Adicionar gênero"
            value={genreInput}
            onChange={e => setGenreInput(e.target.value)}
            style={{
              borderRadius: "5px 0 0 5px",
              backgroundColor: theme === "light" ? "var(--white)" : "#1a191c",
              border: "2px solid",
              borderColor: formErrors.genres
                ? "var(--error)"
                : theme === "light"
                ? "var(--black)"
                : "#232225",
              color: theme === "light" ? "var(--black)" : "var(--white)",
              ...getFieldErrorStyle("genres")
            }}
            backgroundcolor={theme === "light" ? "var(--white)" : "#1a191c"}
            placeholdercolor="#6f6d78"
          />
          <S.AddGenreButton type="button" onClick={handleAddGenre}>
            +
          </S.AddGenreButton>
        </S.GenreInputContainer>

        <S.GenresList>
          {formData.genres?.map((genre, index) => (
            <S.GenreTag key={index} theme={theme}>
              {genre}
              <S.RemoveGenreButton onClick={() => handleRemoveGenre(genre)}>
                ×
              </S.RemoveGenreButton>
            </S.GenreTag>
          ))}
        </S.GenresList>
        {formErrors.genres && (
          <S.ErrorMessage>{formErrors.genres}</S.ErrorMessage>
        )}
      </S.FieldWrapper>
    </Modal>
  )
}

export default AddMovieModal
