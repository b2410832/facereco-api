const handleProfile = (req, res, db) => {
    const { id } = req.params;
    db('users').where({
        id: id
    })
    .then(user => {
        // console.log(user); 
        if(user.length) {
            res.json(user[0]); 
        } else {
            res.status(400).json("No such user");
        }
    })
    .catch(err => res.status(400).json("Error getting user"))
}

// Common JS
module.exports = {
    handleProfile: handleProfile
}