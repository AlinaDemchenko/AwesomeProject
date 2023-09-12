const uploadImageFromDevice = async () => {
    try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.canceled) {
            const imgURI = result.assets[0].uri;
            return imgURI;
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  
  
  export default uploadImageFromDevice;