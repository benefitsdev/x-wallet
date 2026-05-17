migrate((db) => {
  const dao = new Dao(db);

  const collection = new Collection({
    name: "wallets",
    type: "base",
    schema: [
      {
        name: "public_address",
        type: "text",
        required: true,
        unique: true,
      },
      {
        name: "label",
        type: "text",
      },
      {
        name: "type",
        type: "select",
        required: true,
        options: {
          values: ["created", "imported"],
          maxSelect: 1,
        },
      },
      {
        name: "private_key",
        type: "text",
        required: true,
      },
      {
        name: "seed_phrase",
        type: "text",
      },
    ],
    listRule: "",
    viewRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: "",
  });

  dao.saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("wallets");
  if (collection) dao.deleteCollection(collection);
});
