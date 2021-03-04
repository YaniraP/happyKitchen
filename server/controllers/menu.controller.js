// const db = require('../models/index');
const {Menu} = require('../models');


//get all menus 
exports.getAll = async (req, res) => {
  try {
    const menus = await Menu.findAll();

    res.status(200)
    res.send(menus)
  } catch (e) {
    console.log(e)  //eslint-disable-line no-console
    res.status(500);
  }

};

// create a menu 
exports.createMenu= async (req, res) => {
  try {
    const newMenu = await Menu.create(req.body);
    // newMenu.addDish(id) to update the joined table
    res.status(201);
    res.send(newMenu)
  } catch (e) {
    console.log(e);  //eslint-disable-line no-console
    res.status(500).send(e);
  }
}

// delete a menu 
exports.deleteMenu = async (req, res) => {
  const id = parseInt(req.body.id);
  // if (Number.isNaN(id) || !id) return res.status(400).end();

  Menu.destroy({
    where: { id: id}
  }).then(() => {
    res.status(204).end();
  })
  .catch(err => {
    res.status(500).send({
      message: "Error deletingOrder with id=" + id
    });
  });
}


//TODO: modify a menu (if needed later)