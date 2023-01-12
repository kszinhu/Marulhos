import { useForm, yupResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Input,
  Button,
  Select,
  Group,
} from "@mantine/core";
import InputMask from "react-input-mask";
import { ManagerProps } from "../../Manager"; // TODO: fix this import
import { Link } from "react-router-dom";
import { useEffect } from "react";
import API from "@services/api";

export default function SignUp({ yupSchema, title, onSubmit }: ManagerProps) {
  const handleCEP = (cep: string) => {
    cep = cep.replace(/\D/g, "");
    if (cep !== "") {
      if (/^[0-9]{8}$/.test(cep)) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => response.json())
          .then(({ uf, logradouro, bairro }) => {
            return `${logradouro}, ${bairro}, ${uf}`;
          });
      }
      return cep; // user is typing or wrong cep
    }
  };

  const form = useForm({
      initialValues: {
        name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        address_cep: "",
        address_number: "",
        cpf: "",
      },
      validate: yupResolver(yupSchema),
      transformValues: (values) => ({
        ...values,
        last_name: values.name.split(" ").slice(1).join(" "),
        name: values.name.split(" ").shift(),
        address_cep: handleCEP(values.address_cep),
      }),
    }),
    sexChoices = [
      { label: "Masculino", value: "M" },
      { label: "Feminino", value: "F" },
      { label: "Outro", value: "X" },
    ];

  useEffect(() => {
    // change title of the page
    document.title = `Authentication - ${title}`;
  }, []);

  const handleSubmit = async (values: any) => {
    delete values.passwordConfirmation;

    const response = await onSubmit(values);

    if (response.status === 201) {
      const { data } = (await API.post("api/oauth/token", {
        grant_type: "password",
        username: values.username,
        password: values.password,
        scope: "admin",
      })) as unknown as {
        data: {
          access_token: string;
          expires_in: number;
          scope: string;
          token_type: string;
        };
      };

      if (data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("scope", data.scope);
      }
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
        Welcome
      </Title>
      <Text color='dimmed' size='sm' align='center' mt={5}>
        Do have an account?{" "}
        <Anchor component={Link} to='/auth/sign-in'>
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            key='username'
            label='Nome de usuário'
            placeholder='fulano'
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            key='name'
            label='Seu nome'
            placeholder='Fulano de Tal'
            mt='md'
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            key='email'
            label='Email'
            placeholder='you@gmail.dev'
            mt='md'
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            key='password'
            label='Senha'
            placeholder='Insira sua senha'
            required
            mt='md'
            {...form.getInputProps("password")}
          />
          <PasswordInput
            key='passwordConfirmation'
            label='Confirme sua senha'
            placeholder='Insira novamente sua senha'
            required
            mt='md'
            {...form.getInputProps("passwordConfirmation")}
          />
          <Select
            key='sex'
            label='Sexo'
            placeholder='Selecione'
            data={sexChoices}
            mt='md'
            required
            {...form.getInputProps("sex")}
          />
          <Input.Wrapper label='CPF' mt='md' required>
            <Input
              key='cpf'
              component={InputMask}
              mask='999.999.999-99'
              placeholder='000.000.000-00'
              {...form.getInputProps("cpf")}
            />
          </Input.Wrapper>
          <Input.Wrapper label='CEP' mt='md' required>
            <Input
              key='address_cep'
              component={InputMask}
              mask='99999-999'
              placeholder='00000-000'
              {...form.getInputProps("address_cep")}
            />
          </Input.Wrapper>
          <TextInput
            key='address_number'
            label='Número da casa'
            placeholder='123'
            mt='md'
            required
            {...form.getInputProps("address_number")}
          />
          <Group position='center' mt='md'>
            <Button fullWidth type='submit'>
              Sign up
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
