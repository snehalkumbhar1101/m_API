module.exports = (sequelize,DataTypes) => {
    const Employee  = sequelize.define("employees", {
        e_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false,
            
        },
        name:{
            type: DataTypes.STRING,
        },
        email:{
            type: DataTypes.STRING,
            
            isEmail: true,             // checks for email format (foo@bar.com)
              
        },

        password:{
            type: DataTypes.STRING,
        },

        designation:{
            type: DataTypes.STRING,
        },
        // token: { 
        //     type: DataTypes.STRING }
        
    })
        return Employee
    }