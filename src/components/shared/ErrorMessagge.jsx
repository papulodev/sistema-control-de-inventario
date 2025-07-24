import styled from 'styled-components';

function ErrorMessagge({ message }) {
  return (
    <Container>
      <span>Error... {message}</span>
    </Container>
  );
}

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;

export default ErrorMessagge