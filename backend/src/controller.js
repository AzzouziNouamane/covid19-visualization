import { Test } from './models/test.js';

const testPost = (req, res) => {
    const toSave = new Test(
        {
            test: req.body.test
        }
    );

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

export { testPost }