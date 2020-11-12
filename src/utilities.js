const Utils = {
  getTextPreview: (text, charLimit) => {
    if (text.length > charLimit) {
      text = text.substring(0, charLimit) + "...";
    }
    return text;
  },
};

export default Utils;
