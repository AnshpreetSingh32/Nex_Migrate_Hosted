module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Admin", {
        adminId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, 
    {
            timestamps: true,
            tableName: "admins"   // ✅ force lowercase table name
        });
};
