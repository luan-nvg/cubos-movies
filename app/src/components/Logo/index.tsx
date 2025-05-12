import { LogoContainer, LogoText, Subtitle, LogoImage } from "./styles"
import logoImage from "@/assets/images/logo.png"

const Logo = () => {
  return (
    <LogoContainer>
      <LogoImage src={logoImage} alt="Logo" />
      <LogoText>
        <Subtitle>Movies</Subtitle>
      </LogoText>
    </LogoContainer>
  )
}

export default Logo
