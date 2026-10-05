const router = require('express').Router()
const Artifact = require('../models/artifact.model')

router.get('/', async (req, res) => {
  try {
    const artifacts = await Artifact.find()
    res.render('artifacts/index.ejs', { artifacts: artifacts })
  } catch (error) {
    console.log(error)
    res.send('The marketplace could not be opened.')
  }
})


router.get('/new', (req, res) => {
  res.render('artifacts/new.ejs')
})

router.post('/', async (req, res) => {
  try {
    await Artifact.create(req.body)
    res.redirect('artifacts')
  } catch (error) {
    console.log(error)
    res.redirect('/artifacts/new')
  }
})

router.get('/:artifactId', async (req, res) => {
  try {
    const foundArtifact = await Artifact.findById(req.params.artifactId).populate('reviews')
    res.render('artifacts/show.ejs', { artifact: foundArtifact })
  } catch (error) {
    console.log(error)
    res.redirect('/artifacts')
  }
})

router.get('/:artifactId/edit', async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.artifactId)
    res.render('artifacts/edit.ejs', { artifact })
  } catch (error) {
    console.log(error)
    res.redirect('/artifacts')
  }
})

router.put('/:artifactId', async (req, res) => {
  try {
    await Artifact.findByIdAndUpdate(req.params.artifactId, req.body)
    res.redirect(`/artifacts/${req.params.artifactId}`)
  } catch (error) {
    console.log(error)
    res.redirect('/artifacts')
  }
})

router.delete('/:artifactId', async (req, res) => {
  try {
    await Artifact.findByIdAndDelete(req.params.artifactId)
    res.redirect('/artifacts')
  } catch (error) {
    console.log(error)
    res.redirect('/artifacts')
  }
})

module.exports = router
