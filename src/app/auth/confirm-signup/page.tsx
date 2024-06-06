'use client';

import React, { useState, FormEvent } from 'react';
// Chakra imports
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useFormState, useFormStatus } from "react-dom";
import { handleConfirmSignUp } from "../../../lib/cognitoActions";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { redirect } from "next/navigation";

export default function ConfirmSignUpForm() {
  const [redirectToConfirm, setRedirectToConfirm] = useState<boolean>(false); // Add state for redirection
  const [ dispatch] = useFormState(handleConfirmSignUp, undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Changed to useState for error message handling
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
 
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const error = await handleConfirmSignUp(undefined, formData);
    if (error) {
      setErrorMessage(error);
    }
    else {
      // Redirect after successful sign-up
      setRedirectToConfirm(true); // Trigger the redirection state
    }
  };
  if (redirectToConfirm) {
    redirect('/admin/default'); // Use router.push for redirection
   }
  return (
    <DefaultAuthLayout illustrationBackground={'/img/auth/Design.png'}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Confirm Account
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and the code you received !
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
       

          <form onSubmit={handleSubmit}>
            <FormControl>
              
              

              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                isRequired={true}
                variant="auth"
                fontSize="sm"
                id="email"
                name="email"
                ms={{ base: '0px', md: '0px' }}
                type="email"
                placeholder="mail@gmail.com"
                mb="24px"
                fontWeight="500"
                size="lg"
              />
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Code<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  id="code"
                  name="code"
                  placeholder="code"
                  mb="24px"
                  size="lg"
                  variant="auth"
                  minLength={6}
                />
                
              </InputGroup>

              <ConfirmButton  pending={false} /> {/* Adjusted to pass pending prop */}

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

            </FormControl>
          </form>

          
        </Flex>
      </Flex>
    </DefaultAuthLayout>
  );
}

type ConfirmButtonProps = {
  pending: boolean;
};

function ConfirmButton({ pending }: ConfirmButtonProps) {
  
  return (
    <Button
    fontSize="sm"
    variant="brand"
    fontWeight="500"
    w="100%"
    h="50"
    mb="24px" 
    aria-disabled={pending} type="submit">
      Conirm <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
