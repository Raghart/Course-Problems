import { Blogs } from "./blog.js";
import { Users } from "./user.js";
import { readinglists } from "./readinglists.js";
import { active_sesions } from "./active_sesions.js";

Users.hasMany(Blogs, { foreignKey: 'userId' });
Blogs.belongsTo(Users, { foreignKey: 'userId' });

Blogs.belongsToMany(Users, { through: readinglists, as: 'users' });
Users.belongsToMany(Blogs, { through: readinglists, as: 'readings' });

Users.hasMany(active_sesions, { foreignKey: 'userId' });
active_sesions.belongsTo(Users, { foreignKey: 'userId' })