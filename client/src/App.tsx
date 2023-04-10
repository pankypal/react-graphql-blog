import Login from "./pages/login/Login";
import {
  FluentProvider,
  teamsLightTheme,
  makeStyles,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  app: {
    height: "100vh",
    display: "flex",
    backgroundColor: "#9198e5",
  },
});

const App = () => {
  const styles = useStyles();

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={styles.app}>
        <Login />
      </div>
    </FluentProvider>
  );
};

export default App;
