const express = require('express')
const router = express.Router()
const Applicant = require('../model/applicant')

router.route('/applicant')
    .post(function (req, res) {
        var applicant = new Applicant();
        applicant.name = req.body.name;
        applicant.phone = req.body.phone;
        applicant.address = req.body.address;
        applicant.date = new Date().toISOString();
        applicant.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({result: 'ok'});
        });
    })
    .get(function (req, res) {
        Applicant.find(function (err, applicants) {
            if (err) {
                res.send(err);
            }

            res.json(applicants);
        });
    });

router.route('/applicant/:applicantId')
    .get(function (req, res) {
        Applicant.findById(req.params.applicantId, function (err, applicant) {
            if (err) {
                res.send(err);
            }
            res.json(applicant);
        })
    })
    .put(function (req, res) {
        Applicant.findById(req.params.applicantId, function (err, applicant) {
            if (err) {
                res.send(err)
            }
            if (req.body.name) {
                applicant.name = req.body.name;
            }

            if (req.body.phone) {
                applicant.phone = req.body.phone;
            }

            if (req.body.address) {
                applicant.address = req.body.address;
            }

            applicant.save(function (err) {
                if (err) {
                    res.send(err);
                }

                res.json({message: 'applicant updated!'})
            })
        });
    })
    .delete(function (req, res) {
        Applicant.remove({
            _id: req.params.applicantId
        }, function (err, applicant) {
            if (err) {
                res.send(err)
            }

            res.json({message: 'Successfully deleted! '});
        })
    });

module.exports = router
