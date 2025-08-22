module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define("Device", {
        deviceId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        device_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        os_version: DataTypes.STRING,
        ram_gb: DataTypes.INTEGER,
        tpm_version: DataTypes.STRING,
        cpu_generation: DataTypes.STRING,
        isEligible: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        status: {
            type: DataTypes.ENUM('Ready', 'Needs Review', 'Not Compatible', 'Migrated')
        },
        migrationTriggered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",   // ✅ must match user.model.js tableName
                key: "userId"
            },
            unique: true
        }
    }, {
        timestamps: true,
        tableName: "devices"   // ✅ force lowercase table name
    });

    return Device;
};
