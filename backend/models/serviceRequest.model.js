module.exports = (sequelize, DataTypes) => {
    return sequelize.define("ServiceRequest", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: DataTypes.STRING,
        message: DataTypes.STRING,
        createdAt: DataTypes.DATE
    },
{
        timestamps: true,
        tableName: "servicerequests"   // ✅ force lowercase table name
});
};
