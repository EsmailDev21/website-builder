import React, { useState } from "react";
import {
  Stack,
  Flex,
  Heading,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { APIURL } from "../../utils/api";

type AuthDto = {
  email: string;
  password: string;
};

const Signin = () => {
  const [form, setForm] = useState<AuthDto>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (data: AuthDto) => {
    try {
      setLoadingSubmit(true);
      const res = await axios.post(`${APIURL}/auth/login`, {
        identifier: data.email,
        password: data.password,
      });
      if (res.data) {
        toast({
          title: "Logged in Successfully",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log(res.data);
        localStorage.setItem("auth_token", res.data.access_token);
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to Login!";
      toast({
        title: "Failed to Login",
        description: "Failed to Login",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(form);
            }}
          >
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
              />
            </FormControl>
            <Button
              type="submit"
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, blue.400, cyan.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.400, cyan.400)",
                boxShadow: "xl",
              }}
              isLoading={loadingSubmit}
            >
              Sign in
            </Button>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
              mt={4}
            >
              <Text>I don't have an account!</Text>
              <Text color={"blue.500"}>
                <Link to={"/auth/signup"}>Register</Link>
              </Text>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Signin;
