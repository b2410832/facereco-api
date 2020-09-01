const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    if(!name || !email || !password) {
        return res.status(400).json('名稱或email或密碼其一為空白')
    }
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: req.body.email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            console.log(loginEmail);
            return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
};

// Common JS
module.exports = {
    handleRegister: handleRegister
}