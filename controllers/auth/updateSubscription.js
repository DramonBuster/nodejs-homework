const { User } = require("../../models");

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    console.log(subscription)
    const user = await User.findByIdAndUpdate({ _id }, { subscription: subscription }, { new: true })

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            user
            // user: {
            //     name: user.name,
            //     email: user.email,
            //     subscription: user.subscription
            // }
        }
    })
}

module.exports = updateSubscription;