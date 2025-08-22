module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Application", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
        name: DataTypes.STRING,
        version: DataTypes.STRING,
        reinstallRequired: DataTypes.BOOLEAN
    },
        {
            timestamps: false,
            tableName: "applications"   // ✅ force lowercase table name
        });
};
