"use client";

import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { Project, User } from "../../types";
import { useState } from "react";
import { APIURL } from "../../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#3b5bdb" />
      <circle cx="244" cy="106" r="139" fill="#2929a3" />
      <circle cy="291" r="139" fill="#4c20bd" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#24a5e0" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#2bffed" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#c552ff" />
    </Icon>
  );
};

export default function Register() {
  const [formData, setformData] = useState<
    Partial<User & { password: string }>
  >({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const [errorformData, setErrorformData] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const toast = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (data: Partial<User & { password: string }>) => {
    try {
      setLoadingSubmit(true);
      const res = await axios.post(`${APIURL}/auth/signup`, data);
      if (res.data) {
        toast({
          title: "Registered Successfully",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      setLoadingSubmit(false);
      navigate("/auth/signin");
    } catch (error) {
      setErrorSubmit("Failed to register!");
      toast({
        title: "Failed to, register",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoadingSubmit(false);
    }
  };
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Join Us{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, blue.400,cyan.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Start building scalable UIs
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transformData: "scale(1.125)",
                    bgGradient: "linear(to-r, blue.400,cyan.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transformData: "scale(1.125)",
                bgGradient: "linear(to-r, blue.400,cyan.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Register now
              <Text
                as={"span"}
                bgGradient="linear(to-r, blue.400,cyan.400)"
                bgClip="text"
              >
                {" "}
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              And start crafting UIs like it was never been this easy
            </Text>
          </Stack>
          <Box as={"formData"} mt={10}>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
              }}
            >
              <Stack spacing={4}>
                <FormControl isRequired>
                  <Input
                    name="name"
                    placeholder="Firstname"
                    value={formData.name}
                    onChange={handleChange}
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    name="surname"
                    placeholder="Lastname"
                    value={formData.surname}
                    onChange={handleChange}
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>
                <FormControl isRequired>
                  <Input
                    name="email"
                    placeholder="firstname@lastname.io"
                    bg={"gray.100"}
                    value={formData.email}
                    onChange={handleChange}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>

                <FormControl isRequired>
                  <Input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    bg={"gray.100"}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                </FormControl>
              </Stack>
              <Button
                type="submit"
                isLoading={loadingSubmit}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.400,cyan.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, blue.400,cyan.400)",
                  boxShadow: "xl",
                }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}
