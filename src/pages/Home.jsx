import styled from "styled-components"

function Home() {
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`

export default Home