import { Button, ButtonGroup, VisuallyHidden, Text } from "@chakra-ui/react";
import { GoogleIcon } from "./ProviderIcons";
import { useAuth } from "../../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";

const providers = [{ name: "Google", icon: <GoogleIcon boxSize="5" ml={2} /> }];

function OAuthButtonGroup() {
  const { googleLoginMutation } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      googleLoginMutation.mutate((tokenResponse as any).access_token);
    },
  });

  return (
    <ButtonGroup variant="outline" spacing="4" width="full">
      {providers.map(({ name, icon }) => (
        <Button onClick={() => googleLogin()} key={name} width="full">
          <VisuallyHidden>Sign in with {name}</VisuallyHidden>
          <Text>Continue with Google</Text> {icon}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default OAuthButtonGroup;
