import { Container, HazardBoard } from './style';
import Sources from './components/Sources';
import HazardBoardLine from './components/HazardBoardLine';
import { useState } from 'react';
import Description from './components/Description';

const App = () => {
  const [hinContent, setHinContent] = useState('')
  const [unContent, setUnContent] = useState('')

  return (
    <Container>
      <HazardBoard>
        <tbody>
          <HazardBoardLine content={hinContent} setContent={setHinContent} />
          <HazardBoardLine content={unContent} setContent={setUnContent} />
        </tbody>
      </HazardBoard>

      <div>
        <Description hinContent={hinContent} unContent={unContent} />
        <Sources />
      </div>
    </Container>
  );
};

export default App;
