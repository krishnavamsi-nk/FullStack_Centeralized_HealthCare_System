exports.getHome = (req, res) => {
    const object = {
        name: "saipranith",
        email: "saipranithswargam",
    };
    res.status(200).json(object);
};
