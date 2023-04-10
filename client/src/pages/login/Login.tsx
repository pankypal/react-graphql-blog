import {
  Button,
  useId,
  Input,
  Label,
  makeStyles,
  shorthands,
  Text
} from "@fluentui/react-components";
import { PersonRegular, PasswordRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    maxWidth: "400px",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    marginLeft: "auto",
    marginRight: "auto",
    "> form > div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
      marginBottom: "20px"
    }
  },
  button: {
    marginTop: "20px"
  }
});

const Login = () => {
  const loginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  const usernameId = useId("username");
  const passwordId = useId("password");
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Text as="h1" align="center" size={800}>Login</Text>
      <form className="loginForm" onSubmit={loginFormSubmit}>
        <div>
          <Label htmlFor={usernameId}>Username</Label>
          <Input contentBefore={<PersonRegular />} id={usernameId} />
        </div>

        <div>
          <Label htmlFor={passwordId}>Password</Label>
          <Input contentBefore={<PasswordRegular/>} id={passwordId} type="password" />
        </div>

        <Button
          appearance="primary"
          type="submit"
          className={styles.button}
          shape="rounded"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
