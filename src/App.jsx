import styled, { ThemeProvider } from 'styled-components'
import { AuthContextProvider, Dark, Light } from './index'
import AppRoutes from './routers/routes'
import { createContext, useState } from 'react'
import { Device } from './index'

export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setThemeuse] = useState('dark');
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setThemeuse }}>
      <ThemeProvider theme={themeStyle}>
        <AuthContextProvider>
          <Container className={sidebarOpen ? 'sidebar-open' : ''}>
            <section className='content-sidebar'>
              {/* Sidebar content can go here */}
              SIDE BAR
            </section>
            <section className='content-menuburger'>
              MENU BURGER
            </section>
            <section className='content-routes'>
              <AppRoutes />
            </section>
          </Container>
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
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
