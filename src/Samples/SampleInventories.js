import SampleElements from "./SampleElements";

const SampleInventories = [
  {
    creator: "user@email.com",
    date: "31042020-12:34",
    name: "Laboratorio A",
    description: "bla bla bla",
    id: "t55r043ej0j330jd3j023d0",
    users: [
      { user: "admin@email.com", role: "admin" },
      { user: "user@email.com", role: "editor" },
    ],
    categories: [
      { name: "Glass", subcategories: ["Reflux condenser", "Flask"] },
      { name: "Plastic", subcategories: ["Beaker", "Bottle"] },
    ],
    locations: [
      { name: "Deposit 1", sublocations: ["Box #3", "B Shelf"] },
      { name: "Lab", sublocations: ["Door #6", "Drawer #8"] },
    ],
    statuses: [
      "Active",
      "Stored",
      "Inactive",
      "Lent",
      "For repair",
      "Repairing",
    ],
  },
  {
    creator: "user@email.com",
    date: "31042020-12:34",
    name: "Laboratorio B",
    description: "Laboratorio de planta baja",
    id: "0334mffo4o39hnirrifirdjdkfnkKNO736452262",
    users: [
      { user: "admin@email.com", role: "admin" },
      { user: "user@email.com", role: "editor" },
    ],
    categories: [
      { name: "Glass", subcategories: ["Reflux condenser", "Flask"] },
      { name: "Plastic", subcategories: ["Beaker", "Bottle"] },
    ],
    locations: [
      { name: "Deposit 1", sublocations: ["Box #3", "B Shelf"] },
      { name: "Lab", sublocations: ["Door #6", "Drawer #8"] },
    ],
  },
  {
    creator: "user@email.com",
    date: "31042020-12:34",
    name: "Depósito central",
    description: "bla bla bla",
    id: "0334mffo4o39hnirrifirdjdkfnkKNO736452262",
    users: [
      { user: "admin@email.com", role: "admin" },
      { user: "user@email.com", role: "editor" },
    ],
    categories: [
      { name: "Glass", subcategories: ["Reflux condenser", "Flask"] },
      { name: "Plastic", subcategories: ["Beaker", "Bottle"] },
    ],
    locations: [
      { name: "Deposit 1", sublocations: ["Box #3", "B Shelf"] },
      { name: "Lab", sublocations: ["Door #6", "Drawer #8"] },
    ],
    statuses: [
      "Active",
      "Stored",
      "Inactive",
      "Lent",
      "For repair",
      "Repairing",
    ],
  },
];

export default SampleInventories;
