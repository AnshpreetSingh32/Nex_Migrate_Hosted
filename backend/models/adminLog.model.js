module.exports = (sequelize, DataTypes) => {
    return sequelize.define("AdminLog", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
        action: DataTypes.STRING,
        timestamp: DataTypes.DATE
    },
        {
            timestamps: false
        });
};
