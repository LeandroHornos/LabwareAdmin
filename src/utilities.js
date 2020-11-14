const Utils = {
  getTextPreview: (text, charLimit) => {
    if (text.length > charLimit) {
      text = text.substring(0, charLimit) + "...";
    }
    return text;
  },
  makeid: (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
};

export default Utils;
