migrate((db) => {
  const dao = new Dao(db);

  const collection = new Collection({
    name: "transactions",
    type: "base",
    schema: [
      {
        name: "wallet_id",
        type: "relation",
        required: true,
        options: {
          collectionId: "wallets",
          maxSelect: 1,
          cascadeDelete: true,
        },
      },
      {
        name: "type",
        type: "select",
        required: true,
        options: {
          values: ["send", "receive"],
          maxSelect: 1,
        },
      },
      {
        name: "amount",
        type: "text",
        required: true,
      },
      {
        name: "tx_hash",
        type: "text",
      },
      {
        name: "to_address",
        type: "text",
      },
      {
        name: "from_address",
        type: "text",
      },
      {
        name: "status",
        type: "select",
        required: true,
        options: {
          values: ["pending", "confirmed", "failed"],
          maxSelect: 1,
        },
      },
      {
        name: "timestamp",
        type: "autodate",
        options: {
          min: "",
          max: "",
        },
      },
      {
        name: "asset_symbol",
        type: "text",
        required: true,
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
  const collection = dao.findCollectionByNameOrId("transactions");
  if (collection) dao.deleteCollection(collection);
});
