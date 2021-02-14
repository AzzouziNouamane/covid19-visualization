import { Test } from './models/casesModel.js';

const testPost = (req, res) => {
    const toSave = new Test({ str: req.body.str, numb: req.body.numb});

    toSave.save(function (err) {
        if (err) {
            res.status(500).send({
              message: err.message
            });
        }
        res.status(200).send({
          message: 'Successful',
          data: toSave
        });
    })
};

const testGet = async (req, res) => {
    const test = await Test.find({});
    res.status(200).send({
      message: 'Successful',
      data: test
    });
};

export {testPost, testGet}