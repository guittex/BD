<?php

class CollectionUser extends Collection {
    
/** @param User $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return User */
    public function current() {
        return parent::current();
    }

/** @return User */
    public function find($index) {
        return parent::find($index);
    }

/** @return User */
    public function first() {
        return parent::find(0);
    }

/** @return User */
    public function last() {
        return parent::last();
    }

/** @return User */
    public function next() {
        return parent::next();
    }

/** @return User */
    public function pop() {
        return parent::pop();
    }

/** @return User */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionUser nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionUser */
    public static function retrieve() {
        die('CollectionUser nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return User */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
