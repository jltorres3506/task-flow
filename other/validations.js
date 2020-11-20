const yup = require('yup');

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    passcode: yup.string().required(),
    password: yup.string().required().min(7),
    username: yup.string().required().min(10,"Email must be at least 5 characters").email('Please enter a valid email address'),
});


const isRegisterDataValid = (userData,callback)=>{

    

       schema.validate(userData)
        .then(()=>{

            callback(undefined,userData);
            // res.send("all is good: "+data);
        })

        .catch((error)=>{
             
            

            callback(error,userData);
            // res.send("you got validation issue: "+errro);
        })

        
};

module.exports = isRegisterDataValid;