import styled, { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { AuthContextProvider, Dark, Light } from './index'
import AppRoutes from './routers/routes'
import { Device } from './index'
import { useTheme } from './hooks/useTheme'
import Sidebar from './components/sidebar/Sidebar'
import HamburgerMenu from './components/HamburgerMenu'
import { useLocation } from 'react-router'
import Login from './pages/Login'

function App() {
  const { theme } = useTheme();
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={themeStyle}>
      <AuthContextProvider>
        {
          pathname === "/login" ? (
            <Login />
          ) : (
            <Container className={sidebarOpen ? 'sidebar-open' : ''}>
              <section className='content-sidebar'>
                <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
              </section>
              <section className='content-menuburger'>
                <HamburgerMenu />
              </section>
              <section className='content-routes'>
                <AppRoutes />
              </section>
            </Container>
          )
        }
      </AuthContextProvider>
    </ThemeProvider>
  )
}

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};

  .content-sidebar {
    display: none;
  }

  .content-menuburger {
    display: block;
    position: absolute;
    left: 20px;
  }

  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;

    &.sidebar-open {
      grid-template-columns: 250px 1fr;
    }

    .content-sidebar {
      display: initial;
    }

    .content-menuburger {
      display: none;
    }
  }

  .content-routes {
    grid-column: 1;
    width: 100%;

    @media ${Device.tablet} {
      grid-column: 2;
    }
  }
`;
export default App
