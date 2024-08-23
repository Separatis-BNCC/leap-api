export { default as Profile } from "./profile";
export { default as Course } from "./course";
export { default as Content } from "./content";

import Credential from "./credential";
import Class from "./class";
import Session from "./session";
import ClassSession from "./classSession";
import MemberClass from "./memberClass";
import MemberAssignment from "./memberAssignment";
import Assignment from "./assignment";

Credential.belongsToMany(Class, {
  through: MemberClass,
  foreignKey: "credential_id",
  as: "classes",
});

Credential.belongsToMany(Assignment, {
  through: MemberAssignment,
  foreignKey: "credential_id",
  as: "assignments",
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

Assignment.belongsToMany(Credential, {
  through: MemberAssignment,
  foreignKey: "assignment_id",
  as: "members",
});

export { Class, Session, Credential, Assignment };
