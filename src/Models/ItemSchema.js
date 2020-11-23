/* Si bien no se necesitan modelos y esquemas en firebase, concentro en un schema la estructura
general del documento para asegurar la consistencia, y concentrar en el código sólo los cambios que
se van a hacer, tomando los campos por default desde el schema */

const ItemSchema = {
  inventoryId: "",
  creationdate: "",
  lastUpdate: "",
  creatorId: "",
  name: "",
  description: "",
  category: "",
  subcategory: "",
  groups: [
    // {
    //   date: new Date(),
    //   groupname,
    //   location,
    //   sublocation,
    //   status,
    //   ammount,
    // },
  ],
};

export default ItemSchema;
