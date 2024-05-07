const notFound = (req, res) => {
    res.status(404).send("Page u are looking for is not found")
}


module.exports = notFound;