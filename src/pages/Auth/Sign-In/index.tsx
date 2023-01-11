import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { ManagerProps } from "../../Manager";

export default function SignIn({ yupSchema, title, onSubmit }: ManagerProps) {
  const form = useForm({
      initialValues: {
        credentialName: "",
        password: "",
        rememberMe: false,
      },
      validate: yupResolver(yupSchema),
      transformValues: ({ credentialName, ...rest }) => ({
        ...rest,
        username: credentialName,
      }),
    }),
    navigate = useNavigate();

  const handleSubmit = async (
    values: Omit<typeof form.values, "credentialName">
  ) => {
    const { data } = await onSubmit({
      ...values,
      grant_type: "password",
      scope: "admin",
    });

    if (data) {
      const { access_token: accessToken, scope } = data;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("scope", scope);

      scope === "admin" ? navigate("/manager") : navigate("/");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align='center'
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Bem vindo de volta!
      </Title>
      <Text color='dimmed' size='sm' align='center' mt={5}>
        Não tem uma conta?{" "}
        <Anchor
          component={Link}
          to='/auth/sign-up'
          sx={{ textDecoration: "none" }}
        >
          Criar conta
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='Email ou nome de usuário'
            placeholder='seu-email@email.com ou fulano'
            required
            {...form.getInputProps("credentialName")}
          />
          <PasswordInput
            label='Senha'
            placeholder='Insira sua senha'
            required
            mt='md'
            {...form.getInputProps("password")}
          />
          <Group position='apart' mt='lg'>
            <Checkbox label='Lembrar de mim' sx={{ lineHeight: 1 }} />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href='#'
              size='sm'
            >
              Esqueceu sua senha?
            </Anchor>
          </Group>
          <Button fullWidth mt='xl' type='submit'>
            Entrar
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
