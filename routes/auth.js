const router = require ('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const {regValidation , logValidation} = require('../validation')


//REGISTRATION
router.post('/register', async(req,res) => {

    //validate data
    //const validation = Joi.validate(req.body, schema)
    //error response
    const {error} = regValidation(req.body)
    //Error display
    if(error) return res.status(400).send(error.details[0].message)


    //Checking if user already exists
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')

    //Hash the password
    // const salt = await bcrypt.genSalt(10)
    // const hashpass = await bcrypt.hash(req.body.password , salt)
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(req.body.password, salt, null , function (err, hash) {
            if (err) {
                console.log(err);
            }
            user.password = hash;
             //next();
        })
    })

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        // password:hashpass
    })
    try{
        const savedUser = await user.save()
        res.send({user : user._id})
    }catch(err){
        res.status(400).send(err)
    }
})


//LOGIN
router.post('/login', async(req,res) => {
    const {error} = logValidation(req.body)
    //Error display
    if(error) return res.status(400).send(error.details[0].message)
    //Checking if email exists
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email is wrong')
    //PASSWORD IS CORRECT
    // const validpass = await bcrypt.compare(req.body.password, user.password)
    // if(!validpass) return res.status(400).send('Password is wrong')
     bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
        if (err) {
           return callback(err)
        }
        if(!isMatch)
        {
            return res.status(400).send('Password is wrong');
        }
        //  callback(null, isMatch)
    });
    // user.compare(req.body.password, function(err, isMatch){
    //     if(!isMatch) return res.status.send('Password id wrong')
    // })


    res.send('Successfully loged in!!')
})


module.exports = router