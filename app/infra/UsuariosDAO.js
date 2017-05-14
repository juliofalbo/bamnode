function UsuariosDAO(connection) {
    this._connection = connection;
}

UsuariosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from usuarios',callback);
}

UsuariosDAO.prototype.salva = function(usuario, callback) {
    this._connection.query("insert into usuarios values(null, '"+usuario.login+"', '"+usuario.senha+"', '"+usuario.nome+"', 1, '"+usuario.email+"', now(), null, '"+usuario.site+"')", callback);
}

UsuariosDAO.prototype.recuperaPeloId = function(id, callback) {
    this._connection.query('select * from usuarios where id = ?', id, callback);
}

UsuariosDAO.prototype.deleta = function(id, callback) {
    this._connection.query('delete from usuarios where id = ?', id, callback);
}

UsuariosDAO.prototype.edita = function(usuario, callback) {
    if(!Object.keys(usuario.senha).length)
    {
        this._connection.query("update usuarios set login = '"+usuario.login+"', nome = '"+usuario.nome+"', email = '"+usuario.email+"', site = '"+usuario.site+"' where id = " + usuario.id, callback);
    }
    else
    {
        this._connection.query("update usuarios set login = '"+usuario.login+"', senha = '"+usuario.senha+"', nome = '"+usuario.nome+"', email = '"+usuario.email+"', site = '"+usuario.site+"' where id = " + usuario.id, callback);
    }
    
}

module.exports = function(){
    return UsuariosDAO;
};
