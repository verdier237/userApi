const User = require('../Model/User')

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

exports.createUser = async(req,res)=>{
    const {email, pwd,firstname,lastname,age,sex,cell} = req.body;

    if (this.isEmpty(firstname) || this.isEmpty(lastname) || this.isEmpty(email) || this.isEmpty(pwd) || this.isEmpty(age),this.isEmpty(sex),this.isEmpty(cell)) {
        return res.status(400).send(`Missing informations`)
    }
    // if (!this.isAlreadyExists(email)) {
    //     return res.send(`User already exists`)
    // }

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

exports.getUsers = async (req,res)=>{
    let users;
    users = await User.find()

    res.send({
        "status" : true,
        "data" : users
    })
}

exports.getOneUser = async (req,res)=>{
    const u = await User.findOne({
        _id: req.id
    })

    if (!u) {
        return res.status(400).send({
            "status" : false,
            "data" : "Not found"
        })
    } 
    return res.send({
        "status" : true,
        "data" : u
    })
}

exports.updateUser = async (req,res)=>{
    try {
        const updates = req.body
        const u = await User.findOne({
            _id: req.id
        })
    
        if (!u) {
            return res.status(400).send({
                "status" : false,
                "data" : "Not found"
            })
        }

        Object.keys(updates).forEach(key => {
            u[key] = updates[key];
        });

        await u.save();

        return res.send({
            "status": true,
            "data": "User updated successfully"
        });     

        
    } catch (error) {
        return res.status(500).send({
            "status": false,
            "data": "Error updating user",
            "error": error.message
        });
    }
}