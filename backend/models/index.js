const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config'); 

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Admin = require('./admin.model')(sequelize, Sequelize);
db.User = require('./user.model')(sequelize, DataTypes);
db.Device = require('./device.model')(sequelize, Sequelize);
db.Application = require('./application.model')(sequelize, DataTypes);
db.MigrationLog = require('./migrationLog.model')(sequelize, DataTypes);
db.AdminLog = require('./adminLog.model')(sequelize, DataTypes);
db.ServiceRequest = require('./serviceRequest.model')(sequelize, DataTypes);

// Associations
db.User.hasOne(db.Device, {foreignKey: 'userId'});
db.Device.belongsTo(db.User, {foreignKey: 'userId'});

db.Device.hasMany(db.Application, {foreignKey: 'deviceId'});
db.Application.belongsTo(db.Device, {foreignKey: 'deviceId'});

db.Device.hasMany(db.MigrationLog, {foreignKey: 'deviceId'});
db.MigrationLog.belongsTo(db.Device, {foreignKey: 'deviceId'});

db.Admin.hasMany(db.AdminLog, {foreignKey: 'adminId'});
db.AdminLog.belongsTo(db.Admin, {foreignKey: 'adminId'});

db.Device.hasMany(db.ServiceRequest, {foreignKey: 'deviceId'});
db.ServiceRequest.belongsTo(db.Device, {foreignKey: 'deviceId'});

module.exports = db;
