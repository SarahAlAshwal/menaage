const express = require('express');
const router = express.Router();
const Article = require ('../models/article');
const LiveInterviews = require("../models/liveInterviews");
const EducationalVideos = require("../models/educationalVideos");
const Team = require('../models/team');

router.get('/', async(req,res)=>{
  const articles = await Article.find().sort({createdAt: 'desc'}); //gives all the articles
  const liveInterviews = await LiveInterviews.find().sort({createdAt: "desc"});
  const educationalVideos = await EducationalVideos.find().sort({createdAt: "desc",});
  const team = await Team.find().sort({teamId: 1});
  // we can pass any object to index
  
  res.render('admin/admin', {articles: articles, liveInterviews: liveInterviews, educationalVideos: educationalVideos, team: team});
})

router.get('/team/new', (req,res) => {
  res.render('team/new', {team: new Team()})
} );

router.get('/team/edit/:id', async (req, res) => {
  const team = await Team.findById(req.params.id)
  res.render('team/edit', { team: team })
})
router.post('/team', async (req, res, next) => {
  req.team = new Team()
  next()
}, saveTeamAndRedirect('/team/new'))

router.put('/team/:id', async (req, res, next) => {
  req.team = await Team.findById(req.params.id)
  next()
}, saveTeamAndRedirect('/team/edit'))

router.delete('/team/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id)
  res.redirect('/admin')
})


router.get('/articles/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/articles/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})
router.post('/articles', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveAndRedirect('/articles/new'))

router.put('/articles/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveAndRedirect('/articles/edit'))

router.delete('/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/admin')
})

router.get("/liveInterviews/new", (req, res) => {
  res.render("liveInterviews/new", { liveInterview: new LiveInterviews() });
});

router.get("/liveInterviews/edit/:id", async (req, res) => {
  const liveInterview = await LiveInterviews.findById(req.params.id);
  res.render("liveInterviews/edit", { liveInterview: liveInterview });
});

router.post("/liveInterviews",
  async (req, res, next) => {
    req.liveInterview = new LiveInterviews();
    next();
  },
  saveInterviewAndRedirict("/liveInterviews/new")
);

router.delete("/liveInterviews/:id", async (req, res) => {
  await LiveInterviews.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

router.put( "/liveInterviews/:id", async (req, res, next) => {
    req.liveInterview = await LiveInterviews.findById(req.params.id);
    next();
  }, saveInterviewAndRedirict("/liveInterviews/edit"));

  
  router.get("/educationalVideos/new", (req, res) => {
    res.render("educationalVideos/new", {
      educationalVideo: new EducationalVideos(),
    });
  });
  
  router.get("/educationalVideos/edit/:id", async (req, res) => {
    const educationalVideo = await EducationalVideos.findById(req.params.id);
    res.render("educationalVideos/edit", {
      educationalVideo: educationalVideo,
    });
  });
  
  router.post("/educationalVideos",async (req, res, next) => {
      req.educationalVideo = new EducationalVideos();
      next();
    },
    saveeducationalVideoAndRedirict("new")
  );
  
  router.put("/educationalVideos/:id",async (req, res, next) => {
      req.educationalVideo = await EducationalVideos.findById(req.params.id);
      next();
    },
    saveeducationalVideoAndRedirict("edit")
  );
  
  router.delete("/educationalVideos/:id", async (req, res) => {
    await EducationalVideos.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  });
  
  function saveeducationalVideoAndRedirict(path) {
    return async (req, res) => {
      let educationalVideo = req.educationalVideo;
      educationalVideo.title = req.body.title;
      educationalVideo.description = req.body.description;
      educationalVideo.videoUrl = req.body.videoUrl;
  
      try {
        educationalVideo = await educationalVideo.save();
        res.redirect(`/admin`);
      } catch (e) {
        console.log(e);
        res.render(`admin/${path}`, {
          educationalVideo: educationalVideo,
        });
      }
    };
  }


 

function saveAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      //res.redirect(`/articles/${article.slug}`)
      res.redirect('/admin')
    } catch (e) {
      res.render(`/admin${path}`, { article: article })
    }
  }
}


function saveInterviewAndRedirict(path) {
  return async (req, res) => {
    let liveInterview = req.liveInterview;
    liveInterview.title = req.body.title;
    liveInterview.description = req.body.description;
    liveInterview.videoUrl = req.body.videoUrl;
    liveInterview.thumbnail = req.body.thumbnail;

    try {
      liveInterview = await liveInterview.save();
      res.redirect(`/admin`);
    } catch (e) {
      console.log(e);
      res.render(`liveInterviews/${path}`, { liveInterview: liveInterview });
    }
  };
}


function saveTeamAndRedirect(path) {
  return async (req, res) => {
    let team = req.team
    team.name = req.body.name
    team.image= req.body.image
    team.teamId = req.body.teamId
    team.position = req.body.position
    team.details = req.body.details
    try {
      team = await team.save();
      res.redirect('/admin')
    } catch (e) {
      res.render(`/admin${path}`, { team:team })
    }
  }
}

module.exports = router;