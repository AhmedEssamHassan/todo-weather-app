import { useState } from "react";
import { useSelector } from "react-redux";
import DataTabel from "./cpmponents/DataTabel";
import Navbar from "./cpmponents/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DataEntry from "./cpmponents/DataEntry";
import { Route, Routes } from "react-router-dom";
import Weather from "./cpmponents/Weather";

function App() {
  const { mode } = useSelector((state) => state.theme);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const [isModaOpen, setIsModalOpen] = useState(false);

  const handleModalState = () => {
    setIsModalOpen((c) => !c);
  };

  const { data } = useSelector((state) => state.db);

  console.log({ data });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DataEntry
                  handleModalState={handleModalState}
                  isModaOpen={isModaOpen}
                />
                <DataTabel handleModalState={handleModalState} />
              </>
            }
          />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
