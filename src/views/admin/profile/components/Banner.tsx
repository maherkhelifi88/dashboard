// Chakra imports
import { Input, Box, Flex, Avatar, Text, Button, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useFormState, useFormStatus } from "react-dom";
import { handleUpdateUserAttribute } from "../../../../lib/cognitoActions";
import useAuthUser from "../../../../app/hooks/use-auth-user";
export default function Banner(props: {
  banner: string;
  avatar: string | any;
  name: string;
  job: string;
  posts: number | string;
  followers: number | string;
  following: number | string;
  [x: string]: any;
}) {
  const { banner, avatar, name, job, posts, followers, following, ...rest } =
    props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const borderColor = useColorModeValue(
    'white !important',
    '#111C44 !important',
  );

  const user = useAuthUser();
  const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");



  return (
   
      <Card mb={{ base: '0px', lg: '20px' }} alignItems="center" {...rest}>
         <form action={dispatch}  >
         <Card mb={{ base: '0px', lg: '20px' }} alignItems="center" {...rest}>
        <Box
          bg={`url(${banner})`}
          bgSize="cover"
          borderRadius="16px"
          h="131px"
          w="100%"
        />
        <Avatar
          mx="auto"
          src={avatar.src}
          h="87px"
          w="87px"
          mt="-43px"
          border="4px solid"
          borderColor={borderColor}
        />
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        {user?.name}
        </Text>
        <Input
          isRequired={true}
          variant="auth"
          fontSize="sm"
          name="name"
          type="name"
          required
          placeholder="Enter your new name"
          defaultValue={user?.name}
          mb="24px"
          fontWeight="500"
          size="lg"
        />
        <div>
              <input
                id="current_name"
                type="hidden"
                name="current_name"
                defaultValue={user?.name}
              />
            </div>
            <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {status === "error" && (
            <>
              
              <p className="text-sm text-red-500">
                There was an error updating name.
              </p>
            </>
          )}
          {status === "success" && (
            <p className="text-sm text-green-500">
              Name has been updated successfully.
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
        <UpdateButton />
      </div>
      </Card>
      </form>
      </Card>
    
  );
}


function UpdateButton() {
  const { pending } = useFormStatus();

  return <Button aria-disabled={pending}>Update Name</Button>;
}