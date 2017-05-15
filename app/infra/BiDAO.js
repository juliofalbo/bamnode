function BiDAO(connection) {
    this._connection = connection;
}

BiDAO.prototype.listaGraficoTipoDecisaoCPE = function(callback) {
    this._connection.query('select * from graficoTipoDecisaoCPE',callback);
}

BiDAO.prototype.salvaGraficoTipoDecisaoCPE = function(graficoTipoDecisaoCPE, callback) {
    this._connection.query("insert into graficoTipoDecisaoCPE values(null, "+graficoTipoDecisaoCPE.manuais+", "+graficoTipoDecisaoCPE.automaticas+")", callback);
}

BiDAO.prototype.editaGraficoTipoDecisaoCPE = function(graficoTipoDecisaoCPE, callback) {
    this._connection.query("update graficoTipoDecisaoCPE set manuais = "+graficoTipoDecisaoCPE.manuais+", automaticas = "+graficoTipoDecisaoCPE.automaticas, callback);
}

module.exports = function(){
    return BiDAO;
};
