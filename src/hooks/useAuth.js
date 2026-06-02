import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const useAuth = () => {
  const authenticate = async () => {
    let access = await AsyncStorage.getItem("access_token");

    if (access) {
      access = JSON.parse(access);

      if (Date.now() < access.timestamp) {
        return access.token;
      }
    }

    let refresh = await AsyncStorage.getItem("refresh_access");

    if (refresh) {
      refresh = JSON.parse(refresh);

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
        refresh,
      );

      AsyncStorage.setItem(
        "access_token",
        JSON.stringify({
          token: response.data.access_token,
          timestamp: Date.now() + 15 * 60 * 1000,
        }),
      );

      return response.data.access_token
    }

    return null;
  };

  const logOut = async (callback) => {
    await AsyncStorage.removeItem("refresh_access")
    await AsyncStorage.removeItem("access", callback)
  }

  return { authenticate, logOut };
};

export default useAuth;
