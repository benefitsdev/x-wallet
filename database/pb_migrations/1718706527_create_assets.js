migrate((db) => {
  const dao = new Dao(db);

  const collection = new Collection({
    name: "assets",
    type: "base",
    schema: [
      {
        name: "symbol",
        type: "text",
        required: true,
        unique: true,
      },
      {
        name: "name",
        type: "text",
        required: true,
      },
      {
        name: "decimals",
        type: "number",
        required: true,
      },
    ],
    listRule: "",
    viewRule: "",
    createRule: '@request.auth.role = "admin"',
    updateRule: '@request.auth.role = "admin"',
    deleteRule: '@request.auth.role = "admin"',
  });

  dao.saveCollection(collection);

  const record = new Record(collection);
  record.set("symbol", "ETH");
  record.set("name", "Ethereum");
  record.set("decimals", 18);
  dao.saveRecord(record);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("assets");
  if (collection) dao.deleteCollection(collection);
});
