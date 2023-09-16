import { Pressable } from "react-native";
import SVGsend from "../assets/images/Send.svg";

const SendButton = ({onSend, disabled}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onSend}
      style={{
        position: "absolute",
        right: 8,
      }}
    >
      <SVGsend width={34} height={34} />
    </Pressable>
  );
};

export default SendButton;
