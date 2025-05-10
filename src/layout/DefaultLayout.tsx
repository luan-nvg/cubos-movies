import { Outlet } from "react-router-dom"
import { Page, PageContent, PageContainer } from "./styles"
import { Header } from "@/components/Header"
import { useTheme } from "../hooks/useTheme"

function DefaultLayout() {
  const { theme } = useTheme()

  return (
    <Page>
      <PageContent theme={theme}>
        <Header />
        <PageContainer theme={theme}>
          <div className="page-content">
            <Outlet />
          </div>
        </PageContainer>
      </PageContent>
    </Page>
  )
}

export default DefaultLayout
