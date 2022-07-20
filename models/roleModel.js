module.exports = (sequelize,DataTypes) => {
    const Role  = sequelize.define("roles", {
        r_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false,
        },
        name:{
            type: DataTypes.STRING
        },
        
    })
        return Role
    }