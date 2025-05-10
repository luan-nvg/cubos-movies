import { Outlet } from "react-router-dom"
import { Page, PageContent, PageContainer, Footer } from "./styles"
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
        <Footer>2025 © Todos os direitos reservados a Cubos Movies</Footer>
      </PageContent>
    </Page>
  )
}

export default DefaultLayout
