module.exports = {
    parseDateTime: (date) => {
        let dateText = date.toLocaleString().split(' ');
        dateText[1] = dateText[1] + ':' + date.getMilliseconds();
        return dateText.join(' ');
    }
}
