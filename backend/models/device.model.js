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
        os_version: {
            type: DataTypes.STRING
        },
        ram_gb: {
            type: DataTypes.INTEGER
        },
        tpm_version: {
            type: DataTypes.STRING
        },
        cpu_generation: {
            type: DataTypes.STRING
        },
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
                model: 'users',
                key: 'userId'
            },
            unique: true // <- this makes it a 1:1 relationship in the DB as well
        }
    }, {
        timestamps: true
    });

    return Device;
};
