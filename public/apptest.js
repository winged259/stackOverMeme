async(req, res) => {
    const meme = await Memeground.findById(req.params.id);
    const memeResult = await axios.post('https://api.imgflip.com/caption_image', {
        username: 'duytai20',
        password: 'depvaomat01',
        template_id: meme.id
    })
}