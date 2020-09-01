const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json('email或密碼其一為空白')
    }
    db('login').where('email', email).then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid) {
            db('users').where('email', email).then(user => {
                res.json(user[0]);                
            })
            .catch(err => res.status(400).json('Unable to get user'))
        } else {
            res.status(400).json("Not valid");
        }
    })
    .catch(err => res.status(400).json("Not valid"))
}

// Common JS
module.exports = {
    handleSignin: handleSignin
}
