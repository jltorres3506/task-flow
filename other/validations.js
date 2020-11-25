const yup = require('yup');

const schema = yup.object().shape({
    firstName: yup.string().required().label("First Name"),
    lastName: yup.string().required().label("Last Name"),
    passcode: yup.string().required().label("Passcode"),
    password: yup.string().required().min(7).label("Password"),
    email: yup.string().required().min(10).email('Please enter a valid email address').label("Email"),
});


const isRegisterDataValid = (userData,callback)=>{

    const {firstName, lastName, passcode ,email, password} =userData;
    const convertedDataToLowerCase ={

        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        passcode: passcode.toLowerCase(),
        email: email.toLowerCase(),
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