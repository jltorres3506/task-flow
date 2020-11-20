const yup = require('yup');

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    passcode: yup.string().required(),
    password: yup.string().required().min(7),
    username: yup.string().required().min(10,"Email must be at least 5 characters").email('Please enter a valid email address'),
});


const isRegisterDataValid = (userData,callback)=>{

    const {firstName, lastName, passcode ,username, password} =userData;
    const convertedDataToLowerCase ={

        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        passcode: passcode.toLowerCase(),
        username: username.toLowerCase(),
        password,

    };

       schema.validate(convertedDataToLowerCase)
        .then(()=>{

            callback(undefined,convertedDataToLowerCase);
            // res.send("all is good: "+data);
        })

        .catch((error)=>{
             
            

            callback(error,convertedDataToLowerCase);
            // res.send("you got validation issue: "+errro);
        })

        
};

module.exports = isRegisterDataValid;