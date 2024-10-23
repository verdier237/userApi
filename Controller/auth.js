const User = require('../Model/User')
const jwt = require('jsonwebtoken')
const TOKEN_HASH = 'a35c37cf83b09f5ae7350f9ffa21b298b7a7391b1332a49ca0ff5dd3e32f2381d2ea38d7cabe0d9d2a1dd7ca39b84a25fbdf356da2e0cdd146c1a6ec3538ec80'
exports.isEmpty = (some) => {
    if (some === "" || some === undefined || some === null) {
        return true;
    }
    return false;
}

exports.isAlreadyExists = async (email) => {
    let user;
        user = await User.findOne({
            email: email.toLowerCase()
        })
    if (user == null) {
        return false
    }
    return true
}

exports.register =async(req,res)=>{
    const {email, pwd,firstname,lastname,age,sex,cell} = req.body;
    if (this.isEmpty(firstname) || this.isEmpty(lastname) || this.isEmpty(email) || this.isEmpty(pwd) || this.isEmpty(age),this.isEmpty(sex),this.isEmpty(cell)) {
        return res.status(400).send(`Missing informations`)
    }
    if (!this.isAlreadyExists(email)) {
        return res.send(`User already exists`)
    }

    const user = {
        email : email,
        pwd: pwd,
        firstname : firstname,
        lastname : lastname,
        age : age,
        sex : sex,
        cell:cell
    }

    const Userc = await User.create(user)

    if (Userc) return res.send({
        "status" : true,
        "data" : "New user added"
    })

    return res.send({
        "status" : false,
        "data" : "Error ! user not added"
    })

}

exports.login = async(req,res)=>{
    const {email,pwd} = req.body;
    if (this.isEmpty(email) || this.isEmpty(pwd)) {
        return res.status(400).send(`Missing information`)
    }

    const user = await User.findOne({
        email : email.toLowerCase(),
        pwd : pwd
    })
    console.log(user._id.toString());
    

    if (!user) {
        return res.send({
            'status' : false,
            'data' : 'Email or Password incorrect'
        })
    }

    // j W T 

    const token = jwt.sign({'id':user._id.toString()},TOKEN_HASH)

    return res.send({
        'status' : true,
        'token' : token,
    })

}