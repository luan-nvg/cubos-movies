import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ApexChart from "react-apexcharts"
import { SectionTitle } from "@/components/SectionTitle"
import Modal from "@/components/Modal"
import { useTitle } from "@/contexts/TitleContext"
import getBoardDetail from "@/services/Boards/getBoardDetail"
import getTypeReports from "@/services/Boards/TypeReport"
import * as S from "./styles"
import { DropDown } from "@/components/Shared"
import { useIntl } from "react-intl"
import moment from "moment"
import api from "../../../api/axios"
import AnimatedAlert from "@/components/Alert/AnimatedAlert"
import type { AxiosError } from "axios"
import { ApexOptions } from "apexcharts"

const CustomersDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setTitle } = useTitle()
  const intl = useIntl()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [customerDetail, setCustomerDetail] = useState<any>({})
  const [typesOfReport, setTypesOfReport] = useState([])
  const [chartSelectedIndex, setChartSelectedIndex] = useState(-1)
  const [formData, setFormData] = useState({
    initialDate: generateInitialDate(),
    finalDate: currentISODateFormatted(),
    typeReport: "drive"
  })

  const [alert, setAlert] = useState<{
    message: string
    type: "success" | "error" | "warning"
  } | null>(null)

  const [chartData, setChartData] = useState<{
    series: number[]
    options: ApexOptions
  }>({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie" as const,
        events: {
          dataPointSelection: (
            _event: any,
            _chartContext: any,
            config: { dataPointIndex: number }
          ) => {
            setChartSelectedIndex(config.dataPointIndex)
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  })
  console.log(chartData)

  // Get Current Date
  function currentISODateFormatted() {
    return new Date().toISOString().slice(0, 16)
  }

  // Get Current Date - 7
  function generateInitialDate() {
    const today = new Date()
    const initialDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    return initialDate.toISOString().slice(0, 16)
  }

  // Format date for API calls
  function formatDate(date: moment.MomentInput) {
    return moment(date).format("YYYY-MM-DD HH:mm:ss")
  }

  useEffect(() => {
    loadBoardDetails()
    loadTypeReports()
  }, [])

  useEffect(() => {
    setTitle(
      intl.formatMessage(
        { id: "board.details.title" },
        { name: customerDetail?.nameBoard }
      )
    )
  }, [customerDetail, intl, setTitle])

  useEffect(() => {
    if (chartSelectedIndex >= 0) {
      handleChartSelection()
    }
  }, [chartSelectedIndex])

  const loadBoardDetails = async () => {
    setLoading(true)
    try {
      if (id) {
        const res: any = await getBoardDetail(id)

        if (!res.error) {
          setCustomerDetail(res.data)

          // Update chart data
          setChartData({
            series: res.data?.links?.map(
              (link: { count: number }) => link.count
            ),
            options: {
              ...chartData.options,
              labels: res.data?.links?.map(
                (link: { label: string; count: number }) =>
                  `${link.label} (${link.count})`
              )
            }
          })
        }
      } else {
        console.error("ID is undefined")
      }
    } catch (error) {
      console.error("Error loading board details:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadTypeReports = async () => {
    try {
      const response = await getTypeReports({ id_board: id })

      const items = response?.data?.entities

      if (!response.error) {
        const filteredItems = (items || []).filter(
          (item: { value: string }) => item.value !== "all"
        )
        setTypesOfReport(filteredItems)
      }
    } catch (error) {
      console.error("Error loading type reports:", error)
    }
  }

  const handleChartSelection = () => {
    if (!customerDetail || !chartData.options.labels) return

    const selectedLabel = chartData.options.labels[chartSelectedIndex]
    const link = customerDetail.links.find(
      (link: { count: any; label: string }) =>
        `${link.label} (${link.count})` === selectedLabel
    )

    if (link) {
      // navigate(
      //   `/management/boards-link-users/?id_board=${id}&type=${link.value}`
      // )
    }
  }

  const handleSubmitReport = () => {
    const { typeReport, initialDate, finalDate } = formData
    let url

    switch (typeReport) {
      case "all":
        url = `/management/boards-log/?id_board=${id}&start_date=${formatDate(
          initialDate
        )}&end_date=${formatDate(finalDate)}`
        break
      default:
        const typeToUrl: Record<string, string> = {
          input: `type=E&module_value=0,1&type_report=${typeReport}`,
          drive: `type=AC&module_value=0,1&type_report=${typeReport}`,
          drive_and_input: `type=AC,E&module_value=0,1&type_report=${typeReport}`,
          temperature: `type=temp_&type_report=${typeReport}`,
          water_monitoring: `type=N_cx,N_res,AC&type_report=${typeReport}`,
          water_tank_buoy_monitoring: `type=Bcx&type_report=${typeReport}`,
          reservoir_buoy_monitoring: `type=Bres&type_report=${typeReport}`,
          water_tank_monitoring: `type=N_cx&type_report=${typeReport}`,
          reservoir_monitoring: `type=N_res&type_report=${typeReport}`,
          scheduling: `type=AG&type_report=${typeReport}`
        }
        url = `/drives/?id_board=${id}&start_date=${formatDate(
          initialDate
        )}&end_date=${formatDate(finalDate)}&${typeToUrl[typeReport] || ""}`
    }

    navigate(url)
    setIsModalVisible(false)
  }

  return (
    <>
      <S.Container>
        <S.SectionSubtitle>
          <SectionTitle
            fontSize="var(--md)"
            title={intl.formatMessage(
              { id: "board.detail" },
              { name: customerDetail?.nameBoard }
            )}
          />
          <S.NewButton
            onClick={() => setIsModalVisible(true)}
            textbutton={intl.formatMessage({ id: "general.report" })}
          />
        </S.SectionSubtitle>
        <>
          {loading ? (
            <S.LoadingIndicator />
          ) : (
            <S.CardContent>
              {/* <S.ChartTitle>
                {intl.formatMessage({ id: "board.chart.title" })}
              </S.ChartTitle> */}
              <S.ChartContainer>
                <S.ChartWrapper>
                  <ApexChart
                    options={chartData.options}
                    series={chartData.series}
                    type="pie"
                    width={380}
                  />
                </S.ChartWrapper>
              </S.ChartContainer>
            </S.CardContent>
          )}
        </>
      </S.Container>

      {isModalVisible && (
        <>
          <Modal
            textbuttonSave="Consultar"
            title={intl.formatMessage({ id: "general.report" })}
            onClose={() => setIsModalVisible(false)}
            onSave={async () => {
              const { initialDate, finalDate } = formData

              try {
                const res = await api.post("/drives/valid-rule-date", {
                  queryParams: {
                    start_date: formatDate(initialDate),
                    end_date: formatDate(finalDate)
                  }
                })

                if (res.data.success) {
                  handleSubmitReport()
                } else {
                  setAlert({
                    message: "Erro inesperado. Tente novamente mais tarde.",
                    type: "error"
                  })
                }
              } catch (err) {
                const error = err as AxiosError<{ message: string }>

                const serverMessage = error.response?.data?.message

                setAlert({
                  message:
                    serverMessage ||
                    "Erro inesperado. Tente novamente mais tarde.",
                  type: "error"
                })
              }
            }}
          >
            <S.FormGroup>
              {alert && (
                <AnimatedAlert
                  message={alert.message}
                  type={alert.type}
                  onClose={() => setAlert(null)}
                />
              )}

              <S.Label>
                {intl.formatMessage({ id: "report.type.label" })}
              </S.Label>
              <DropDown
                titledropdown={intl.formatMessage({
                  id: "dropdown.select.type"
                })}
                sections={[
                  {
                    options: typesOfReport.map((report: { value: string }) => ({
                      label: intl.formatMessage({
                        id: `general.dropdown.${
                          report?.value?.toLowerCase() || ""
                        }`
                      }),
                      value: report?.value || ""
                    }))
                  }
                ]}
                onSelect={value => {
                  if (typeof value === "string") {
                    setFormData(prev => ({ ...prev, typeReport: value }))
                  } else {
                    console.error("Valor selecionado não é uma string:", value)
                  }
                }}
                selectedValue={formData.typeReport}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.DateTimePicker
                value={formData.initialDate}
                onChange={date => {
                  setFormData({ ...formData, initialDate: date.target.value })
                }}
                label={intl.formatMessage({
                  id: "report.startDate.placeholder"
                })}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.DateTimePicker
                value={formData.finalDate}
                onChange={date => {
                  setFormData({ ...formData, finalDate: date.target.value })
                }}
                label={intl.formatMessage({
                  id: "report.endDate.placeholder"
                })}
              />
            </S.FormGroup>
          </Modal>
        </>
      )}
    </>
  )
}

export default CustomersDetail
