const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

/**Dynamic route for any project */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const currProj = projects[id];
    const title = currProj.project_name;
    const { description, technologies } = currProj;
    const links = [ currProj.live_link, currProj.github_link ];
    const contentImgs = [];
    
    /**Pushig all images to pass to project page exvept title image */
    for (let i = 1; i < currProj.image_urls.length; i++) {
        contentImgs.push(currProj.image_urls[i]);
    }

    const templateData = { title, description, technologies, links, contentImgs };

    res.render('project', templateData);
});

module.exports = router;
