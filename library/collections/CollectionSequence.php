<?php

class CollectionSequence extends Collection {
    
/** @param Sequence $object */
    public function add(Model $object) {
        parent::add($object);
    }

/** @return Sequence */
    public function current() {
        return parent::current();
    }

/** @return Sequence */
    public function find($index) {
        return parent::find($index);
    }

/** @return Sequence */
    public function first() {
        return parent::find(0);
    }

/** @return Sequence */
    public function last() {
        return parent::last();
    }

/** @return Sequence */
    public function next() {
        return parent::next();
    }

/** @return Sequence */
    public function pop() {
        return parent::pop();
    }

/** @return Sequence */
    public function shift() {
        return parent::shift();
    }

// ====================================================================================================================

    public function save(&$model) {
        die('CollectionSequence nao possui metodo save em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

/** @return CollectionSequence */
    public static function retrieve() {
        die('CollectionSequence nao possui metodo retrieve em arquivo. implementar se necessario.');
    }

// ====================================================================================================================

    public function getFilename() {
        return null;
    }

/** @return Sequence */
    public function getBy($attName, $attValue) {
        return parent::getBy($attName, $attValue);
    }

}
