const Utils = {
  getTextPreview: (text, charLimit) => {
    if (text.length > charLimit) {
      text = text.substring(0, charLimit) + "...";
    }
    return text;
  },
  makeId: (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  groupAsPairs: (items) => {
    // Create a 2D array where every element is an array of 2 items.
    // It can be used to make rows with 2 items each.

    let pairs = [];
    let pair = [];
    let count = 0;
    items.forEach((item) => {
      if (count < 1) {
        pair.push(item);
        count++;
      } else {
        pair.push(item);
        pairs.push(pair);
        pair = [];
        count = 0;
      }
    });
    if (pair.length > 0) {
      pairs.push(pair);
    }
    return pairs;
  },
  groupAsTriplets: (items) => {
    // Create a 2D array where every element is an array of 3 items.
    // It can be used to make rows with 3 items each.
  
    let triplets = [];
    let triplet = [];
    let count = 0;
    items.forEach((item) => {
      if (count < 2) {
        triplet.push(item);
        count++;
      } else {
        triplet.push(item);
        triplets.push(triplet);
        triplet = [];
        count = 0;
      }
    });
    if (triplet.length > 0) {
      triplets.push(triplet);
    }
    return triplets;
  },
};

export default Utils;
