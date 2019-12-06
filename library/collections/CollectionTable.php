<?php

class CollectionTable extends Collection {
    
/** @param Table $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return Table */
    public function current() {
        return parent::current();
    }

/** @return Table */
    public function find($index) {
        return parent::find($index);
    }

/** @return Table */
    public function first() {
        return parent::find(0);
    }

/** @return Table */
    public function last() {
        return parent::last();
    }

/** @return Table */
    public function next() {
        return parent::next();
    }

/** @return Table */
    public function pop() {
        return parent::pop();
    }

/** @return Table */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionTable nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionTable */
    public static function retrieve() {
        die('CollectionTable nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return Table */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
