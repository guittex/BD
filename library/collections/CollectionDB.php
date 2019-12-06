<?php

class CollectionDB extends Collection {
    
/** @param DB $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return DB */
    public function current() {
        return parent::current();
    }

/** @return DB */
    public function find($index) {
        return parent::find($index);
    }

/** @return DB */
    public function first() {
        return parent::find(0);
    }

/** @return DB */
    public function last() {
        return parent::last();
    }

/** @return DB */
    public function next() {
        return parent::next();
    }

/** @return DB */
    public function pop() {
        return parent::pop();
    }

/** @return DB */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionDB nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionDB */
    public static function retrieve() {
        die('CollectionDB nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return DB */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
