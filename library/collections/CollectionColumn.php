<?php

class CollectionColumn extends Collection {
    
/** @param Column $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return Column */
    public function current() {
        return parent::current();
    }

/** @return Column */
    public function find($index) {
        return parent::find($index);
    }

/** @return Column */
    public function first() {
        return parent::find(0);
    }

/** @return Column */
    public function last() {
        return parent::last();
    }

/** @return Column */
    public function next() {
        return parent::next();
    }

/** @return Column */
    public function pop() {
        return parent::pop();
    }

/** @return Column */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionColumn nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionColumn */
    public static function retrieve() {
        die('CollectionColumn nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return Column */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
