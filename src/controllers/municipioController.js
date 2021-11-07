const controllerm = {};

controllerm.listm = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM municipio', (err, municipio) => {
     if (err) {
      res.json(err);
     }
     res.render('municipio', {
      data: municipio
     });
    });
  });
};

controllerm.savem = (req, res) => {
  const { NombreMunicipio, NumeroMunicipio } = req.body;
  console.log("datos  ", req.body);
  req.getConnection((err, connection) => {
    const query = connection.query(`
      INSERT INTO municipio(NombreMunicipio, NumeroMunicipio) VALUES("${NombreMunicipio}", "${NumeroMunicipio}")
    `, (err, municipio) => {
        res.redirect('/municipio');
    })
  })
};

controllerm.editm = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM municipio WHERE idMunicipio = ?", [id], (err, rows) => {
      res.render('municipio_edit', {
        data: rows[0]
      })
    });
  });
};

controllerm.updatem = (req, res) => {
  const { id } = req.params;
  const { NombreMunicipio, NumeroMunicipio } = req.body;
  console.log(req.body)
  req.getConnection((err, conn) => {
    conn.query(`
      UPDATE municipio set NombreMunicipio = "${NombreMunicipio}", NumeroMunicipio= ${NumeroMunicipio} where idMunicipio = ${id}
      `, (err, rows) => {
        res.redirect('/municipio');
      });
  });
};

controllerm.deletem = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM municipio WHERE idMunicipio = ?', [id], (err, rows) => {
      res.redirect('/municipio');
    });
  });
};

module.exports = controllerm;
