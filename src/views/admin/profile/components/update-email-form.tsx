"use client";

import React, { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyIcon from '@mui/icons-material/Key';
import { useFormState, useFormStatus } from "react-dom";
import {
    handleConfirmUserAttribute,
    handleUpdateUserAttribute,
} from "../../../../lib/cognitoActions";
import useAuthUser from "../../../../app/hooks/use-auth-user";
import { Input, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';

export default function UpdateEmailForm() {
    const user = useAuthUser();
    const [status, dispatch] = useFormState(handleUpdateUserAttribute, "");
    const [confirmStatus, dispatchConfirm] = useFormState(
        handleConfirmUserAttribute,
        undefined
    );
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

    const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = await dispatch(formData);
        console.log("Update result:", result);
    };

    const handleConfirmSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const result = await dispatchConfirm(formData);
        console.log("Confirm result:", result);
    };


    return (
        <Card mb={{ base: '0px', lg: '20px' }} alignItems="center">
            <form action={dispatch}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <div className="mb-4">
                        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
                            Update Profile
                        </Text>
                        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
                            Email
                        </Text>
                        <div className="relative mt-2 rounded-md">
                            <div className="relative">
                                <Input
                                    isRequired={true}
                                    variant="auth"
                                    fontSize="sm"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Enter your email address"
                                    defaultValue={user?.email}
                                    mb="24px"
                                    fontWeight="500"
                                    size="lg"
                                />
                            </div>
                            <input
                                id="current_email"
                                type="hidden"
                                name="current_email"
                                defaultValue={user?.email}
                            />
                        </div>
                    </div>
                    <div
                        className="flex h-8 items-end space-x-1"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {status === "error" && (
                            <>
                                <ErrorOutlineIcon className="h-5 w-5 text-red-500" />
                                <p className="text-sm text-red-500">
                                    There was an error updating email.
                                </p>
                            </>
                        )}
                        {status === "success" && (
                            <p className="text-sm text-green-500">
                                Email has been updated successfully.
                            </p>
                        )}
                    </div>
                    {status?.includes("code") && (
                        <>

                            <div className="mb-1">
                                <label
                                    htmlFor="amount"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    {status}
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <div className="relative">
                                        <Input
                                            id="code"
                                            type="text"
                                            name="code"
                                            placeholder="Enter code to verify email"
                                            required
                                            minLength={6}
                                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        />
                                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex h-8 items-end space-x-1"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {confirmStatus === "error" && (
                                    <>
                                        <ErrorOutlineIcon className="h-5 w-5 text-red-500" />
                                        <p className="text-sm text-red-500">
                                            There was an error verifying your email
                                        </p>
                                    </>
                                )}
                                {confirmStatus === "success" && (
                                    <p className="text-sm text-green-500">
                                        Email verified successfully
                                    </p>
                                )}
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                            <VerifyButton dispatch={dispatchConfirm} />
                            </div>

                        </>
                    )}
                </div>
                {!status?.includes("code") && (
                    <div className="mt-6 flex justify-end gap-4">
                        <UpdateButton />
                    </div>
                )}
            </form>
        </Card>
    );
}

function UpdateButton() {
    const { pending } = useFormStatus();

    return <Button type="submit" aria-disabled={pending}>Update Email</Button>;
}

function VerifyButton({ dispatch }: { dispatch: (payload: FormData) => void }) {
    const { pending } = useFormStatus();
  
    return (
      <Button aria-disabled={pending} formAction={dispatch}>
        Verify Email
      </Button>
    );
  }
