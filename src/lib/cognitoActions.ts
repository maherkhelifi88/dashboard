import { redirect } from "next/navigation";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resendSignUpCode,
  autoSignIn,
  updateUserAttribute,
  type UpdateUserAttributeOutput,
  confirmUserAttribute,
  updatePassword,
} from "aws-amplify/auth";
import { getErrorMessage } from "../utils/get-error-message";
import  Auth  from 'aws-amplify';

interface SignUpResult {
  isSignUpComplete?: boolean;
  userId?: string;
  nextStep?: any; 
  errorMessage?: string;
}


export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
): Promise<SignUpResult> {
  try {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const name = String(formData.get("name"));

    console.log("SignUp Payload:", { email, password, name });

    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
        autoSignIn: true,
      },
    });


    console.log("SignUp Success:", { isSignUpComplete, userId, nextStep });

    return { isSignUpComplete, userId, nextStep };
  } catch (error) {
    console.error("SignUp Error:", error);
    return { errorMessage: getErrorMessage(error) };
  }
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    const email = String(formData.get("email"));
    console.log("Resend Verification Code Payload:", { email });

    await resendSignUpCode({ username: email });

    currentState = {
      ...prevState,
      message: "Code sent successfully",
    };
    console.log("Resend Verification Code Success");
  } catch (error) {
    console.error("Resend Verification Code Error:", error);
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(error),
    };
  }

  return currentState;
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const email = String(formData.get("email"));
    const code = String(formData.get("code"));
    console.log("Confirm SignUp Payload:", { email, code });

    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    await autoSignIn();

    console.log("Confirm SignUp Success:", { isSignUpComplete, nextStep });
    redirect("/auth/sign-in");
  } catch (error) {
    console.error("Confirm SignUp Error:", error);
    return getErrorMessage(error);
  }
}

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  let redirectLink = "admin/default";
  try {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    console.log("SignIn Payload:", { email, password });
   
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });
    

    console.log("SignIn Success:", { isSignedIn, nextStep });

    if (nextStep?.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({ username: email });
     
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    return getErrorMessage(error);
  }

 
}


export async function handleSignOut(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  try {
    await signOut();
    localStorage.removeItem('user'); // Remove user from local storage
    window.location.href = '/auth/sign-in'; // Redirect to sign-in page
  } catch (error) {
    console.error('Error signing out: ', error);
  }
}
export async function handleUpdateUserAttribute(
  prevState: string,
  formData: FormData
) {
  let attributeKey = "name";
  let attributeValue;
  let currentAttributeValue;

  if (formData.get("email")) {
    attributeKey = "email";
    attributeValue = formData.get("email");
    currentAttributeValue = formData.get("current_email");
  } else {
    attributeValue = formData.get("name");
    currentAttributeValue = formData.get("current_name");
  }

  if (attributeValue === currentAttributeValue) {
    return "";
  }

  try {
    console.log("UpdateUserAttribute Payload:", { attributeKey, attributeValue });

    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey: String(attributeKey),
        value: String(attributeValue),
      },
    });

    console.log("UpdateUserAttribute Success:", output);
    return handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.error("UpdateUserAttribute Error:", error);
    return "error";
  }
}

function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case "CONFIRM_ATTRIBUTE_WITH_CODE":
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      return `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`;
    case "DONE":
      return "success";
  }
}

export async function handleUpdatePassword(
  prevState: "success" | "error" | undefined,
  formData: FormData
) {
  const currentPassword = formData.get("current_password");
  const newPassword = formData.get("new_password");

  if (currentPassword === newPassword) {
    return;
  }

  try {
    console.log("UpdatePassword Payload:", { currentPassword, newPassword });

    await updatePassword({
      oldPassword: String(currentPassword),
      newPassword: String(newPassword),
    });

    console.log("UpdatePassword Success");
  } catch (error) {
    console.error("UpdatePassword Error:", error);
    return "error";
  }

  return "success";
}

export async function handleConfirmUserAttribute(
  prevState: "success" | "error" | undefined,
  formData: FormData
) {
  const code = formData.get("code");

  if (!code) {
    return;
  }

  try {
    console.log("ConfirmUserAttribute Payload:", { code });
    await confirmUserAttribute({
      userAttributeKey: "email",
      confirmationCode: String(code),
    });

    console.log("ConfirmUserAttribute Success");
  } catch (error) {
    console.error("ConfirmUserAttribute Error:", error);
    return "error";
  }

  return "success";
}
