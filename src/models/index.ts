export { default as Profile } from "./profile";
export { default as Course } from "./course";
export { default as Content } from "./content";
export { default as Assignment } from "./assignment";

import Credential from "./credential";
import Class from "./class";
import Session from "./session";
import ClassSession from "./classSession";
import MemberClass from "./memberClass";

Credential.belongsToMany(Class, {
  through: MemberClass,
  foreignKey: "credential_id",
  as: "classes",
});

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

Class.belongsToMany(Credential, {
  through: MemberClass,
  foreignKey: "class_id",
  as: "members",
});

export { Class, Session, Credential };
