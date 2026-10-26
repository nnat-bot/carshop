import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import Carlist from './components/Carlist';

function App() {
  return (
    <Container maxWidth="xl">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car Shop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </Container>
  );
}

export default App;