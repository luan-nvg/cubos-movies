import { Link, useLocation } from "react-router-dom"
import { RiHome3Line } from "react-icons/ri"
import * as S from "./styles"

interface BreadCrumbProps {
  title: string
}

const Breadcrumb = ({ title }: BreadCrumbProps) => {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter(x => x)

  return (
    <S.Wrapper aria-label="breadcrumb">
      <S.list className="breadcrumb">
        <S.item className="breadcrumb-item">
          <Link to="/">
            <RiHome3Line size={18} color="gray" />
          </Link>
        </S.item>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1
          const to = `/${pathnames.slice(0, index + 1).join("/")}`

          return last ? (
            <S.item key={to} aria-current="page">
              {title ? title : value}
            </S.item>
          ) : (
            <S.item key={to}>
              <Link to={to}>{value}</Link>
            </S.item>
          )
        })}
      </S.list>
    </S.Wrapper>
  )
}

export default Breadcrumb
