<?php

class CollectionUsuario extends Collection {

/** 
 * @param Usuario $object
 * @return void */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return Usuario */
    public function current() {
        return parent::current();
    }

/** @return Usuario */
    public function find($index) {
        return parent::find($index);
    }

/** @return Usuario */
    public function first() {
        return parent::find(0);
    }

/** @return Usuario */
    public function last() {
        return parent::last();
    }

/** @return Usuario */
    public function next() {
        return parent::next();
    }

/** @return Usuario */
    public function pop() {
        return parent::pop();
    }

/** @return Usuario */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

/** @return CollectionUsuario */
    public static function retrieve() {
        $collection = new CollectionUsuario();
        return $collection->read();
    }

// ====================================================================================================================

    public function getFilename() {
        return (UTIL_PATH . '/users.json');
    }

/** @return Usuario */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

// ====================================================================================================================

/** 
 * @desc autentica usuario e senha na aplicação (retorna null se o usuario nao for encontrado)
 * @example auth($username)
 * @example auth($username, $password)
 * @param string $username
 * @param string $password
 * @return Usuario */
    public function auth($username, $password = null) {

        $all  = $this->retrieve();
        $auth = null;
        
        while ($user = $all->next()) {
            
            if ($password) {
                $ok = ($user->getUsername() == $username && $user->getPassword() == md5($password));
            }
            else {
                $ok = ($user->getUsername() == $username);
            }
            
            if ($ok) {
                $user->remove('password');
                $auth = $user;
                break;
            }
            
        }

        return $auth;
    }

}
