function UsuariosDAO(connection) {
    this._connection = connection;
}

UsuariosDAO.prototype.lista = function(callback) {
    this._connection.query('select * from users',callback);
}

UsuariosDAO.prototype.salva = function(usuario, callback) {
    this._connection.query("insert into users values(null, '"+usuario.username+"', '"+usuario.password+"', '"+usuario.nome+"', 1, '"+usuario.email+"', now(), null, '"+usuario.site+"')", callback);
}

UsuariosDAO.prototype.recuperaPeloId = function(id, callback) {
    this._connection.query('select * from users where id = ?', id, callback);
}

UsuariosDAO.prototype.recuperaPeloUsername = function(username, callback) {
    this._connection.query('select * from users where username = ?', username, callback);
}

UsuariosDAO.prototype.deleta = function(id, callback) {
    this._connection.query('delete from users where id = ?', id, callback);
}

UsuariosDAO.prototype.edita = function(usuario, callback) {
    this._connection.query("update users set nome = '"+usuario.nome+"', email = '"+usuario.email+"', site = '"+usuario.site+"', ativo = '"+usuario.ativo+"' where id = " + usuario.id, callback);
}

UsuariosDAO.prototype.salvaUsuarioLinkedIn = function(usuario, callback) {
    this._connection.query("insert into users values(null, '"+usuario.username+"', 'linkedin', '"+usuario.nome+"', 1, '"+usuario.email+"', now(), '"+usuario.site+"', '"+usuario.foto+"')", callback);
}

module.exports = function(){
    return UsuariosDAO;
};
