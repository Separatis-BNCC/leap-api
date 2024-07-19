export { default as Credential } from "./credential";
export { default as Profile } from "./profile";
export { default as Course } from "./course";

import Class from "./class";
import Session from "./session";
import ClassSession from "./classSession";

Session.belongsToMany(Class, {
  through: ClassSession,
  foreignKey: "session_id",
  as: "classes",
});

Class.belongsToMany(Session, {
  through: ClassSession,
  foreignKey: "class_id",
  as: "sessions",
});

export { Class, Session };
