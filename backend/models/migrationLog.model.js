module.exports = (sequelize, DataTypes) => {
    return sequelize.define("MigrationLog", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
        status: DataTypes.STRING,
        timestamp: DataTypes.DATE
    },
        {
            timestamps: false
        });
};
