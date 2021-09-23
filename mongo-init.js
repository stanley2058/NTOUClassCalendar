db.createUser({
  user: "ntou",
  pwd: "ntou-calendar",
  roles: [
    {
      role: "readWrite",
      db: "Record",
    },
  ],
});
