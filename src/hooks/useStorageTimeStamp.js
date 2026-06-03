import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorageTimeStamp = ( timestampInMinutes = 5 ) => {
  const baseTimestamp = timestampInMinutes

  const getItemFromAsyncStorage = async (key, ignoreTimeStamp) => {
    let result = await AsyncStorage.getItem(key);

    result = JSON.parse(result);

    let currentDate = new Date().getTime();

    if (result?.timestamp < currentDate && !ignoreTimeStamp) {
      return null;
    }

    return result;
  };

  const setItemToAsyncStorage = (key, object) => {
    let timeStamp = baseTimestamp * 60

    let currentDate = new Date().getTime();

    object = { ...object, timestamp: currentDate + timeStamp };

    AsyncStorage.setItem(key, JSON.stringify(object))
  };

  return { getItemFromAsyncStorage, setItemToAsyncStorage };
};

export default useStorageTimeStamp;
