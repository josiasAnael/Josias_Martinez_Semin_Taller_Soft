const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(`
    SELECT municipio.NombreMunicipio AS Municipio, Nombre ,cliente.idCliente as id, Apellido, Telefono, Correo, cliente.estado , Direccion FROM cliente LEFT JOIN municipio ON cliente.Municipio = municipio.idMunicipio;
      `, (err1, cliente) => {
     if (err1) {
      res.json(err1);
     }
     conn.query('SELECT * FROM municipio', (err2, municipio) => {
       if (err2) {
        res.json(err2);
       }
       res.render('cliente', {
          data: cliente,
          municipio
       });  
     });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO cliente set ?', data, (err, cliente) => {
      console.log(cliente)
      res.redirect('/');
    })
  })
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM cliente WHERE idCliente = ?", [id], (err1, rows1) => {
      conn.query("SELECT * FROM municipio", (err2, rows2) => {
        res.render('cliente_edit', {
          data: rows1[0],
          municipio: rows2
        })
      });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newcliente= req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE cliente set ? where idCliente = ?', [newcliente, id], (err, rows) => {
    res.redirect('/');
  });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('UPDATE cliente set estado = 0 where idCliente= ?;', [id], (err, rows) => {
      res.redirect('/');
    });
  });
}

module.exports = controller;
