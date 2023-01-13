import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import themeConfigs from './configs/themeConfigs';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* Configure toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={50000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />

      {/* Mui reset css */}
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
